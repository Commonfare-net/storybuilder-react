import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';

import './StoryPlace.css';

export default class StoryPlace extends Component {
  static propTypes = {
    place: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { place, onChange } = this.props;

    const editorOptions = {
      disableReturn: true,
      disableDoubleReturn: true,
      disableExtraSpaces: true,
      placeholder: {
        text: 'Place',
        hideOnClick: true
      },
      toolbar: false,
      extensions: {
        imageDragging: {}
      }
    }

    return (
      <Editor
        tag="h2"
        text={place}
        options={editorOptions}
        onChange={onChange}
        className="story-builder__place" />
    )
  }
}
