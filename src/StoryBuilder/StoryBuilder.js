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
    })).isRequired
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

  render() {
    const { story } = this.props;

    return (
      <div className="story-builder">
        <h1 class="story-builder__title">Write your story</h1>
        {story.map((item) => {
          const StoryItem = this.storyItem(item.type);
          return <StoryItem content={item.content} />
        })}
      </div>
    );
  }
}
export default StoryBuilder;
