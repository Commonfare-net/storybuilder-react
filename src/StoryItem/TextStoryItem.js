import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import toolbarOptions from './toolbarOptions';

import StoryItem from './StoryItem';

import './TextStoryItem.css';

export default class TextStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    editing: false,
    disabled: false
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content
    }
  }

  handleChange = (text) => {
    this.setState({ content: text });
  }

  render() {
    const { onSave, onRemove, editing, disabled } = this.props;

    return (
      <StoryItem
        className="text-story-item"
        icon="font"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onOpen={() => this.reactQuillRef.getEditor().focus()}
        onSave={() => onSave(this.state.content)}
        onRemove={onRemove}>
        <ReactQuill
          ref={(el) => this.reactQuillRef = el}
          value={this.state.content}
          onChange={this.handleChange}
          {...toolbarOptions}
        />
      </StoryItem>
    )
  }
}
