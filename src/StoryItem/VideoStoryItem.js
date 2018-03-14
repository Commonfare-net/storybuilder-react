import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';
const MediumEditor = require('medium-editor');
import MediumEditorAutofocus from 'medium-editor-autofocus';

import StoryItem from './StoryItem';

export default class VideoStoryItem extends Component {
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

  // finds the provider to show the proper icon (if you want)
  // videoUrl = () => {
  //   const { content } = this.state;
  //   if (content.match(/src="([^"]+)"/)) {
  //     return content.match(/src="([^"]+)"/)[1];
  //   } else {
  //     return "";
  //   }
  // }

  detectVideoProvider = () => {
    const { content } = this.state;

    if (content.search('youtube')) {
      return 'youtube'
    } else if (content.search('vimeo')) {
      return 'vimeo'
    } else {
      return null;
    }
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
        text: 'Paste embed code',
        hideOnClick: false
      },
      extensions: {
        imageDragging: {},
        autofocus: new MediumEditorAutofocus()
      }
    }

    return (
      <StoryItem
        className="video-story-item"
        icon='film'
        editing={editing}
        disabled={disabled}
        content={this.videoUrl()}
        onSave={() => onSave(content)}
        onRemove={onRemove}>
        <Editor
          ref={editor => this.editor = editor}
          text={content}
          options={editorOptions}
          onChange={this.handleChange}
        />
      </StoryItem>
    )
  }
}
