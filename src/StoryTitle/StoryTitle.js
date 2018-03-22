import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';

import './StoryTitle.css';

export default class StoryTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { title, onChange } = this.props;

    const editorOptions = {
      disableReturn: true,
      disableDoubleReturn: true,
      disableExtraSpaces: true,
      placeholder: {
        text: 'Title',
        hideOnClick: true
      },
      toolbar: false,
      extensions: {
        imageDragging: {}
      }
    }

    return (
      <Editor
        tag="h1"
        text={title}
        options={editorOptions}
        onChange={onChange}
        className="story-builder__title" />
    )
  }
}
