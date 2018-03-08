import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from '../StoryTitle/StoryTitle';
import Place from '../StoryPlace/StoryPlace';
import TextStoryItem from '../StoryItem/TextStoryItem';
import ImageStoryItem from '../StoryItem/ImageStoryItem';
import AddButton from '../AddButton/AddButton';

import throttle from 'lodash/throttle';
import isEmpty from 'lodash/isEmpty';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './StoryBuilder.css';

class StoryBuilder extends Component {
  static propTypes = {
    title: PropTypes.string,
    place: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['text', 'image']),
      content: PropTypes.string.isRequired,
    })).isRequired,
    onSave: PropTypes.func
  }

  static defaultProps = {
    items: []
  }

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      place: props.place,
      items: props.items
    };
  }

  save = throttle(() => this.props.onSave(this.state), 1000)

  updateTitle = (newTitle) => {
    this.setState({ title: newTitle }, () => {
      if (!isEmpty(this.state.place)) this.save()
    })
  }

  updatePlace = (newPlace) => {
    this.setState({ place: newPlace }, () => {
      if (!isEmpty(this.state.title)) this.save()
    })
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
      const { items } = prevState

      return {
        items: [
          ...items.slice(0, index),
          { ...items[index], content: newContent, editing: undefined }, // undefined so that it doesn't get passed to the API
          ...items.slice(index + 1)
        ]
      }
    }, this.save);
  }

  addItem = (item) => {
    this.setState((prevState) => ({
      items: [...(prevState.items), {...item, editing: true }]
    }))
  }

  render() {
    const { title, place, items } = this.state;

    return (
      <div className="story-builder">
        <Title title={title} onSave={this.updateTitle} />
        <Place place={place} onSave={this.updatePlace} />
        {items.map((item, index) => {
          const StoryItemComponent = this.storyItem(item.type);
          return <StoryItemComponent
                  key={index}
                  editing={item.editing}
                  content={item.content}
                  onSave={(newContent) => this.updateItem(newContent, index)} />
        })}
        {!isEmpty(title) && !isEmpty(place) &&
          <AddButton onAdd={this.addItem}/>
        }
      </div>
    );
  }
}
export default StoryBuilder;
