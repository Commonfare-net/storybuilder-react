import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

import './StoryItem.css';

export default class extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  render() {
    const { icon, content } = this.props;

    return (
      <div className="story-item">
        <div className="story-item__icon">
          <FontAwesome name={icon} size="3x" className="fa-fw"/>
        </div>
        <div className="story-item__content">
          {content}
        </div>
      </div>
    )
  }
}
