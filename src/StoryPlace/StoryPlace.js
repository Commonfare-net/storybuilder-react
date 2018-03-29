import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';

import './StoryPlace.css';

export default class StoryPlace extends Component {
  static propTypes = {
    place: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  render() {
    const { place, onChange } = this.props;

    return (
      <ReactQuill
        theme={null}
        defaultValue={place}
        placeholder="Place"
        onChange={text => onChange(sanitizeHtml(text, { allowedTags: [] }))}
        className="story-builder__place" />
    )
  }
}
