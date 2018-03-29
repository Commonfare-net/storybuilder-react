import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

import StoryItem from './StoryItem';

import './LargeTextStoryItem.css';

export default class LargeTextStoryItem extends Component {
  static propTypes = {
    content: string.isRequired,
    onSave: func.isRequired,
    onRemove: func.isRequired,
    editing: bool,
    disabled: bool
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

  autoFocusEditor = () => this.reactQuillRef.getEditor().focus()

  save = () => {
    const { onSave } = this.props;
    const { content } = this.state;

    onSave(sanitizeHtml(content, { allowedTags: [] }));
  }

  render() {
    const { onRemove, editing, disabled } = this.props;
    const { content } = this.state;

    const editorOptions = {
      theme: null,
      placeholder: 'Write something that stands out...'
    }

    return (
      <StoryItem
        className="large-text-story-item"
        icon="text-height"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onOpen={this.autoFocusEditor}
        onSave={this.save}
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
