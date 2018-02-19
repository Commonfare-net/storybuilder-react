import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StoryItem from './StoryItem';

export default class extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  }

  render() {
    return (
      <StoryItem
        icon="image"
        content={this.props.content}
      />
    )
  }
}
