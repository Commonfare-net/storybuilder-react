import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';

import StoryItem from './StoryItem';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

export default class extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    // onBlur: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content
    }
  }

  handleChange = (text, medium) => {
    this.setState({ content: text });
  }

  render() {
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
        icon="font"
        content={this.state.content.replace(/(<[^>]+>)|(&nbsp;)/g, '')}>
        <Editor
          text={this.state.content}
          options={editorOptions}
          onChange={this.handleChange}
        />
      </StoryItem>
    )
  }
}