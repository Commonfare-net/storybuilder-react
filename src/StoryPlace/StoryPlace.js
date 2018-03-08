import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';

import './StoryPlace.css';

export default class StoryPlace extends Component {
  static propTypes = {
    place: PropTypes.string,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { place: props.place };
  }

  handleChange = (text, medium) => {
    const { onSave } = this.props;

    this.setState({ place: text }, () => {
      onSave(text);
    });
  }

  render() {
    const { place } = this.state;

    const editorOptions = {
      placeholder: {
        text: 'Place',
        hideOnClick: false
      },
      toolbar: false
    }

    return (
      <Editor
        tag="h2"
        text={place}
        options={editorOptions}
        onChange={this.handleChange}
        className="story-builder__place" />
    )
  }
}
