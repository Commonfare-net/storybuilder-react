import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';
import AutoLinks from 'quill-auto-links';

import StoryItem from './StoryItem';
import './TextStoryItem.css';

Quill.register('modules/autoLinks', AutoLinks);

export default class TextStoryItem extends Component {
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
  save = () => this.props.onSave(this.state.content)

  render() {
    const { onRemove, editing, disabled } = this.props;

    const editorOptions = {
      theme: "bubble",
      placeholder: "Write something...",
      modules: {
        autoLinks: true,
        toolbar: ['bold', 'italic', 'underline', 'link', 'blockquote']
      }
    }

    return (
      <StoryItem
        className="text-story-item"
        icon="font"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onOpen={this.autoFocusEditor}
        onSave={this.save}
        onRemove={onRemove}>
        <ReactQuill
          ref={(el) => this.reactQuillRef = el}
          value={this.state.content}
          onChange={this.handleChange}
          {...editorOptions}
        />
      </StoryItem>
    )
  }
}
