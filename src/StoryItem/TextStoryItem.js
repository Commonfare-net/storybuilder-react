import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';

import StoryItem from './StoryItem';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

export default class TextStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    editing: PropTypes.bool
  }

  static defaultProps = {
    editing: false
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content
    }
  }

  handleChange = (text, medium) => {
    const { onChange } = this.props;

    this.setState({ content: text });
  }

  render() {
    const { onSave, editing } = this.props;

    const editorOptions = {
      placeholder: {
        text: 'Write something...',
        hideOnClick: false
      },
      toolbar: {
        buttons: ['bold', 'italic', 'underline']
      }
    }

    return (
      <StoryItem
        className="text-story-item"
        icon="font"
        editing={editing}
        content={this.state.content.replace(/(<[^>]+>)|(&nbsp;)/g, '')}
        onSave={() => onSave(this.state.content)}>
        <Editor
          text={this.state.content}
          options={editorOptions}
          onChange={this.handleChange}
        />
      </StoryItem>
    )
  }
}
