import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

import './StoryItem.css';

export default class extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    children: PropTypes.element
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  toggleEditor = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  startEditing = () => this.setState({ editing: true });
  doneEditing = () => this.setState({ editing: false });

  render() {
    const { icon, content, children, onDoneEditing } = this.props;
    const { editing } = this.state;

    return (
      <div
        className={`story-item ${this.state.editing ? 'story-item--editing' : ''}`}
        onClick={() => !editing ? this.startEditing() : null}>
        <div className="story-item__icon">
          <FontAwesome name={icon} size="3x" className="fa-fw"/>
        </div>
        <div className="story-item__content">
          {content}
        </div>
        <div className="story-item__editor">
          {children}
          <button
            onClick={this.doneEditing}>
            Done
          </button>
        </div>
      </div>
    )
  }
}
