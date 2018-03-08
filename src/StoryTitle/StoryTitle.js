import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-medium-editor';

import './StoryTitle.css';

export default class StoryTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    onSave: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { title: props.title };
  }

  handleChange = (text, medium) => {
    const { onSave } = this.props;

    this.setState({ title: text }, () => {
      onSave(text);
    });
  }

  render() {
    const { title } = this.state;

    const editorOptions = {
      placeholder: {
        text: 'Title',
        hideOnClick: true
      },
      toolbar: false
    }

    return (
      <Editor
        tag="h1"
        text={title}
        options={editorOptions}
        onChange={this.handleChange}
        className="story-builder__title" />
    )
  }
}
