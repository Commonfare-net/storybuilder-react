import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextStoryItem from '../StoryItem/TextStoryItem';
import LargeTextStoryItem from '../StoryItem/LargeTextStoryItem';
import ImageStoryItem from '../StoryItem/ImageStoryItem';
import VideoStoryItem from '../StoryItem/VideoStoryItem';
import AddButton from '../AddButton/AddButton';

export default class StoryContent extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
    imageDeleteHandler: PropTypes.func.isRequired
  }

  static defaultProps = {
    disabled: false
  }

  addItem = (item) => {
    const { items, onChange } = this.props;

    onChange([
      ...items,
      {...item, editing: true }
    ])
  }

  updateItem = (newContent, index) => {
    const { items, onChange } = this.props;

    onChange([
      ...items.slice(0, index),
      { ...items[index], ...newContent, editing: undefined }, // undefined so that it doesn't get passed to the API
      ...items.slice(index + 1)
    ])
  }

  removeItem = (item, index, callback) => {
    const { items, onChange } = this.props;

    Promise.resolve(onChange(items.filter((item, idx) => idx !== index)))
    .then(() => { if (callback) callback(item) });
  }

  renderStoryItem = (item, index) => {
    const { type, editing, content } = item;
    const props = {
      key: index,
      disabled: this.props.disabled,
      editing: editing && !this.props.disabled,
      content
    };

    switch (type) {
      case 'text':
        return <TextStoryItem
          {...props}
          onSave={(content) => this.updateItem({ content: content }, index)}
          onRemove={() => this.removeItem(item, index)}
        />;
      case 'largeText':
        return <LargeTextStoryItem
          {...props}
          onSave={(content) => this.updateItem({ content: content }, index)}
          onRemove={() => this.removeItem(item, index)}
        />;
      case 'image':
        return <ImageStoryItem
          {...props}
          caption={item.caption}
          imageUploadHandler={this.props.imageUploadHandler}
          onSave={({ content, caption }) => this.updateItem({ content, caption }, index)}
          onRemove={() => this.removeItem(item, index, this.props.imageDeleteHandler)}
        />;
      case 'video':
        return <VideoStoryItem
          {...props}
          onSave={(content) => this.updateItem({ content: content }, index)}
          onRemove={() => this.removeItem(item, index)}
        />;
      default:
        return new Error(`Invalid story item type: ${type}`);
    }
  }

  render() {
    const { items, disabled } = this.props;

    return (
      <div>
        {items.map(this.renderStoryItem)}
        {!disabled &&
          <AddButton onAdd={this.addItem}/>
        }
      </div>
    )
  }
}
