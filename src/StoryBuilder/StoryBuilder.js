import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextStoryItem from '../StoryItem/TextStoryItem';
import ImageStoryItem from '../StoryItem/ImageStoryItem';

import './StoryBuilder.css';

class StoryBuilder extends Component {
  static propTypes = {
    story: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['text', 'image']),
      content: PropTypes.string.isRequired,
    })).isRequired,
    onSave: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { story: props.story };
  }

  storyItem = (type) => {
    switch (type) {
      case 'text':
        return TextStoryItem;
      case 'image':
        return ImageStoryItem;
      default:
        return new Error(`Invalid story item type: ${type}`);
    }
  }

  updateItem = (newContent, index) => {
    this.setState((prevState) => {
      const { story } = prevState

      return {
        story: [
          ...story.slice(0, index),
          { ...story[index], content: newContent },
          ...story.slice(index + 1)
        ]
      }
    }, () => this.props.onSave(this.state));
  }

  render() {
    const { story } = this.props;

    return (
      <div className="story-builder">
        <h1 className="story-builder__title">Write your story</h1>
        {story.map((item, index) => {
          const StoryItemComponent = this.storyItem(item.type);
          return <StoryItemComponent
                  key={index}
                  content={item.content}
                  onSave={(newContent) => this.updateItem(newContent, index)} />
        })}
      </div>
    );
  }
}
export default StoryBuilder;
