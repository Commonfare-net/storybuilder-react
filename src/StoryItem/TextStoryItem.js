import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';
const MediumEditor = require('medium-editor');

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

  autoFocus = () => {
    const { medium } = this.editor;
    const { origElements: { childNodes } } = medium;

    // select the last paragraph
    const lastElement = childNodes[childNodes.length - 1];
    medium.selectElement(lastElement);

    // clear the selection and put the cursor at the end
    MediumEditor.selection.clearSelection(document);
    medium.getExtensionByName('toolbar').hideToolbar();
  }

  handleChange = (text, medium) => {
    const { onChange } = this.props;

    this.setState({ content: text });
  }

  render() {
    const { onSave, onRemove, editing, disabled } = this.props;

    const editorOptions = {
      placeholder: {
        text: 'Write something...',
        hideOnClick: false
      },
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'quote']
      },
      extensions: {
        imageDragging: {}
      }
    }

    return (
      <StoryItem
        className="text-story-item"
        icon="font"
        editing={editing}
        disabled={disabled}
        content={this.state.content.replace(/(<[^>]+>)|(&nbsp;)/g, ' ')}
        onOpen={() => this.autoFocus()}
        onSave={() => onSave(this.state.content)}
        onRemove={onRemove}>
        <Editor
          ref={editor => this.editor = editor}
          text={this.state.content}
          options={editorOptions}
          onChange={this.handleChange}
        />
      </StoryItem>
    )
  }
}
