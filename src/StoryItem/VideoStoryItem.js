import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import isEmpty from 'lodash/isEmpty';
import sanitizeHtml from 'sanitize-html';
import embed from 'embed-video';

import StoryItem from './StoryItem';

export default class VideoStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    editing: false,
    disabled: false,
    content: '',
    url: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      url: props.url
    }
  }

  htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  handleChange = (text) => {
    const url = sanitizeHtml(text, { allowedTags: [] });

    try {
      const embedCode = embed(url, { attr: { width: 560, height: 315 } });

      if (embedCode) {
        this.setState({
          unsupported: false,
          content: embedCode,
          url
        });
      } else {
        this.setState({
          unsupported: true,
          content: ''
        })
      }
    } catch (e) {
      this.setState({
        unsupported: true,
        content: ''
      })
    }
  }

  // finds the provider to show the proper icon (if you want)
  videoUrl = () => {
    const { content } = this.state;
    if (content.match(/src="([^"]+)"/)) {
      return content.match(/src="([^"]+)"/)[1];
    } else {
      return "";
    }
  }

  render() {
    const { onSave, onRemove, editing, disabled } = this.props;
    const { url, content, unsupported } = this.state;

    const editorOptions = {
      theme: null,
      placeholder: 'Paste the URL of a video from YouTube, Vimeo or DailyMotion'
    }

    return (
      <StoryItem
        className="video-story-item"
        icon='film'
        editing={editing}
        disabled={disabled}
        content={url}
        onSave={() => onSave({ url, content })}
        onRemove={onRemove}>
        <div>
          {unsupported &&
            <p>
              <strong>Unsupported source. Please paste a URL from YouTube, Vimeo or DailyMotion</strong>
            </p>
          }
          {isEmpty(content) &&
            <ReactQuill
              onChange={this.handleChange}
              {...editorOptions}
            />
          }
          {!isEmpty(content) &&
            <div dangerouslySetInnerHTML={{ __html: content }} />
          }
        </div>
      </StoryItem>
    )
  }
}
