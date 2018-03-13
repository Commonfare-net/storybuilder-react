import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from '../StoryTitle/StoryTitle';
import Place from '../StoryPlace/StoryPlace';
import Tags from '../StoryTags/StoryTags';
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
    availableTags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['text', 'image']),
      content: PropTypes.string.isRequired,
    })).isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
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
      tags: props.tags,
      items: props.items
    };
  }

  canSave = () => !isEmpty(this.state.title) && !isEmpty(this.state.place)

  save = throttle(() => {
    if (this.canSave()) {
      this.props.onSave(this.state)
    }
  }, 1000)

  updateTitle = (newTitle) => {
    this.setState({ title: newTitle }, this.save)
  }

  updatePlace = (newPlace) => {
    this.setState({ place: newPlace }, this.save)
  }

  updateTags = (newTags) => {
    this.setState({ tags: newTags }, this.save)
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

  renderStoryItem = (item, index) => {
    const { type, editing, content } = item;
    const props = {
      key: index,
      editing,
      content,
      onSave: (newContent) => this.updateItem(newContent, index)
    };

    switch (type) {
      case 'text':
        return <TextStoryItem {...props} />;
      case 'image':
        return <ImageStoryItem {...props} imageUploadHandler={this.props.imageUploadHandler} />;
      default:
        return new Error(`Invalid story item type: ${type}`);
    }
  }

  render() {
    const { availableTags } = this.props;
    const { title, place, tags, items } = this.state;

    return (
      <div className="story-builder">
        <Title title={title} onSave={this.updateTitle} />
        <Place place={place} onSave={this.updatePlace} />
        {this.canSave() &&
          <Tags availableTags={availableTags} tags={tags} onSave={this.updateTags} />
        }
        {items.map(this.renderStoryItem)}
        {this.canSave() &&
          <AddButton onAdd={this.addItem}/>
        }
      </div>
    );
  }
}
export default StoryBuilder;
