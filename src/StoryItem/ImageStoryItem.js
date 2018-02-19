import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StoryItem from './StoryItem';

import './ImageStoryItem.css';

export default class ImageStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
  }

  render() {
    return (
      <StoryItem
        className="image-story-item"
        icon="image"
        content={this.props.content}
        onSave={() => ({})}>
        <div className="image-story-item__uploader">
          <img src={this.props.content} />
        </div>
      </StoryItem>
    )
  }
}
