import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

import './StoryTitle.css';

export default class StoryTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { title, onChange } = this.props;

    return (
      <ReactQuill
        theme={null}
        defaultValue={title}
        placeholder="Title"
        onChange={(text) => onChange(sanitizeHtml(text, { allowedTags: [] }))}
        className="story-builder__title" />
    )
  }
}
