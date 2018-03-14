import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';
const MediumEditor = require('medium-editor');
import MediumEditorAutofocus from 'medium-editor-autofocus';

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

  // autoFocus = () => {
  //   const { medium } = this.editor;
  //   const { origElements: { childNodes } } = medium;
  //
  //   medium.selectAllContents();
  //
  //   // clear the selection and put the cursor at the end
  //   MediumEditor.selection.clearSelection(document);
  // }

  handleChange = (text, medium) => {
    const { onChange } = this.props;

    this.setState({ content: text });
  }

  render() {
    const { onSave, onRemove, editing, disabled } = this.props;
    const { content } = this.state;

    const editorOptions = {
      disableReturn: true,
      disableDoubleReturn: true,
      disableExtraSpaces: true,
      toolbar: false,
      placeholder: {
        text: 'Highlight something...',
        hideOnClick: false
      },
      extensions: {
        imageDragging: {},
        autofocus: new MediumEditorAutofocus()
      }
    }

    return (
      <StoryItem
        className="large-text-story-item"
        icon="text-height"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onSave={() => onSave(this.state.content)}
        onRemove={onRemove}>
        <Editor
          tag="h2"
          ref={editor => this.editor = editor}
          text={this.state.content}
          options={editorOptions}
          onChange={this.handleChange}
        />
      </StoryItem>
    )
  }
}
