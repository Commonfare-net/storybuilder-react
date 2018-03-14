import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';
import Dotdotdot from 'react-dotdotdot';

import './StoryItem.css';

export default class StoryItem extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    editing: PropTypes.bool,
    content: PropTypes.string.isRequired,
    onOpen: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    children: PropTypes.element,
    className: PropTypes.string
  }

  static defaultProps = {
    disabled: false,
    editing: false
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: props.editing,
      // content: props.content
    }
  }

  // Trigger onOpen if the item is added with editing set to true
  componentDidMount() {
    if (this.state.editing && this.props.onOpen) {
      this.props.onOpen();
    }
  }

  // Close the item if it is being edited and it becomes disabled for any reason
  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled && this.state.editing) {
      this.setState({ editing: false });
    }
  }

  toggleEditor = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  startEditing = () => this.setState({ editing: true }, () => { if (this.props.onOpen) this.props.onOpen() });
  doneEditing = () => this.setState({ editing: false }, this.props.onSave);
  remove = () => { if (confirm("Are you sure? This cannot be undone")) this.props.onRemove(this.props.content) };

  render() {
    const { icon, content, children, className, disabled } = this.props;
    const { editing } = this.state;

    return (
      <div
        className={`story-item ${editing ? 'story-item--editing' : ''} ${className}`}
        onClick={() => (!disabled && !editing) ? this.startEditing() : null}>
        <div className="story-item__icon">
          <FontAwesome name={icon} size="3x" className="fa-fw"/>
        </div>
        <div className="story-item__content">
          <Dotdotdot clamp={3}>{content}</Dotdotdot>
        </div>
        <div className="story-item__editor">
          {children}
          {!disabled &&
            <div className="story-item__buttons">
              <button className="story-item__remove-button"
                onClick={this.remove}>
                Remove
              </button>
              <button
                className="story-item__done-button"
                onClick={this.doneEditing}>
                Done
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}
