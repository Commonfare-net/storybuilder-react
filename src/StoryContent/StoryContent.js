import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Code for drag and drop behavior adapted from https://codesandbox.io/s/k260nyxq9v
import { connect } from 'react-redux';
import { deleteItem, editItem, updateItem, reorderItems } from '../actions';

import TextStoryItem from '../StoryItem/TextStoryItem';
import LargeTextStoryItem from '../StoryItem/LargeTextStoryItem';
import ImageStoryItem from '../StoryItem/ImageStoryItem';
import VideoStoryItem from '../StoryItem/VideoStoryItem';

import './StoryContent.css';

class StoryContent extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'largeText', 'image', 'video']).isRequired,
      content: PropTypes.string,
      caption: PropTypes.string
    })).isRequired,
    disabled: PropTypes.bool,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    reorderItems: PropTypes.func.isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
    imageDeleteHandler: PropTypes.func.isRequired
  }

  static defaultProps = {
    imageUploadHandler: function() {},
    imageDeleteHandler: function() {}
  }

  removeItem = (item, index, callback) => {
    const { deleteItem } = this.props;
    deleteItem(item, index).then(() => { if (callback) callback(item) });
    // see https://stackoverflow.com/questions/39524855/how-to-trigger-off-callback-after-updating-state-in-redux
  }

  reorderItems = (result) => {
    const { items, reorderItems } = this.props;
    const { source: { index: sourceIndex }, destination: { index: destinationIndex }} = result;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    reorderItems(
      items,
      sourceIndex,
      destinationIndex
    )
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
    const { editItem, updateItem, disabled } = this.props;
    const { type, editing, content } = item;
    const props = {
      key: index,
      disabled: disabled,
      editing: editing && !disabled,
      editItem: () => editItem(index),
      content
    };

    switch (type) {
      case 'text':
        return <TextStoryItem
          {...props}
          onSave={(content) => updateItem({ content: content }, index)}
          onRemove={() => this.removeItem(item, index)}
        />;
      case 'largeText':
        return <LargeTextStoryItem
          {...props}
          onSave={(content) => updateItem({ content: content }, index)}
          onRemove={() => this.removeItem(item, index)}
        />;
      case 'image':
        return <ImageStoryItem
          {...props}
          caption={item.caption}
          imageUploadHandler={this.props.imageUploadHandler}
          onSave={({ content, caption }) => updateItem({ content, caption }, index)}
          onRemove={() => this.removeItem(item, index, this.props.imageDeleteHandler)}
        />;
      case 'video':
        return <VideoStoryItem
          {...props}
          url={item.url}
          onSave={({ content, url }) => updateItem({ content, url }, index)}
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
                <Draggable key={item.id} draggableId={item.id} index={index}>
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

const mapStateToProps = (state) => ({
  items: state.content_json,
  disabled: state.disabled
});

const mapDispatchToProps = {
  deleteItem,
  editItem,
  updateItem,
  reorderItems
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContent);
