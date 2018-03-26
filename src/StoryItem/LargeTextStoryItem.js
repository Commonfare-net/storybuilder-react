import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

import toolbarOptions from './toolbarOptions';
import StoryItem from './StoryItem';

import './LargeTextStoryItem.css';

export default class LargeTextStoryItem extends Component {
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
    const { content } = this.state;

    const editorOptions = {
      ...toolbarOptions,
      modules: {
        toolbar: false
      },
      // style: {
      //   fontSize: '2rem',
      //   fontWeight: 500
      // }
    }

    return (
      <StoryItem
        className="large-text-story-item"
        icon="text-height"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onOpen={() => this.reactQuillRef.getEditor().focus()}
        onSave={() => onSave(sanitizeHtml(this.state.content, { allowedTags: [] }))}
        onRemove={onRemove}>
        <ReactQuill
          ref={(el) => this.reactQuillRef = el}
          value={content}
          onChange={this.handleChange}
          {...editorOptions} />
      </StoryItem>
    )
  }
}
