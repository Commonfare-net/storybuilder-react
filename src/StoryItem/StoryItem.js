import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';
import Dotdotdot from 'react-dotdotdot';

import './StoryItem.css';

export default class StoryItem extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    children: PropTypes.element,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      content: props.content
    }
  }

  toggleEditor = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  startEditing = () => this.setState({ editing: true });
  doneEditing = () => this.setState({ editing: false }, this.props.onSave); // TODO: è qua!

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
          <Dotdotdot clamp={3}>{content}</Dotdotdot>
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
