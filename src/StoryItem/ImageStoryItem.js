import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import StoryItem from './StoryItem';

import './ImageStoryItem.css';

export default class ImageStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    editing: PropTypes.bool
  }

  static defaultProps = {
    editing: false
  }

  render() {
    return (
      <StoryItem
        className="image-story-item"
        icon="image"
        content={this.props.content}
        editing={this.props.editing}
        onSave={() => ({})}>
        <div className="image-story-item__uploader">
          <div className="image-story-item__image-wrapper">
            <img src={this.props.content} />
            <button className="image-story-item__remove-button">
              <FontAwesome name='times' size='2x' />
            </button>
          </div>
        </div>
      </StoryItem>
    )
  }
}
