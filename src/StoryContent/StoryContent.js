import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Code for drag and drop behavior adapted from https://codesandbox.io/s/k260nyxq9v

import TextStoryItem from '../StoryItem/TextStoryItem';
import LargeTextStoryItem from '../StoryItem/LargeTextStoryItem';
import ImageStoryItem from '../StoryItem/ImageStoryItem';
import VideoStoryItem from '../StoryItem/VideoStoryItem';

import './StoryContent.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

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

  reorderItems = (result) => {
    const { items, onChange } = this.props;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    onChange(reorderedItems);
  }

  draggableStoryItem = (item, index) => (provided, snapshot) => (
    <div>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`story-item-wrapper ${snapshot.isDragging ? 'story-item-wrapper--is-dragging' : ''}`}
        style={provided.draggableProps.style}>
        {this.renderStoryItem(item, index)}
      </div>
      {provided.placeholder}
    </div>
  )

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
    const { items } = this.props;

    return (
      <DragDropContext onDragEnd={this.reorderItems}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={index} draggableId={index} index={index}>
                  {this.draggableStoryItem(item, index)}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}
