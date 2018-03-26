import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import isEmpty from 'lodash/isEmpty';
import sanitizeHtml from 'sanitize-html';

import toolbarOptions from './toolbarOptions';
import StoryItem from './StoryItem';

export default class VideoStoryItem extends Component {
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

  htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  handleChange = (text) => {
    const encodedContent = text.replace(/<\/?p>/,'');
    const decodedContent = this.htmlDecode(encodedContent);
    const sanitizedContent = sanitizeHtml(decodedContent, {
      allowedTags: ['iframe', 'p', 'a'],
      allowedAttributes: {
        a: ['href'],
        iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
      },
      allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com', 'www.dailymotion.com']
    });

    if (sanitizedContent.indexOf("src=") >= 0) {
      this.setState({ content: sanitizedContent });
    } else {
      // this.setState({ content: undefined });
      // medium.origElements.innerHTML = "";
      alert("Unsupported content! Please paste a valid embed code from YouTube, Vimeo or DailyMotion");
      this.props.onRemove();
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
    const { content } = this.state;

    const editorOptions = {
      ...toolbarOptions,
      theme: null,
      modules: {
        toolbar: false
      }
    }

    return (
      <StoryItem
        className="video-story-item"
        icon='film'
        editing={editing}
        disabled={disabled}
        content={this.videoUrl()}
        onSave={() => onSave(content)}
        onRemove={onRemove}>
        <div>
          {isEmpty(content) &&
            <ReactQuill
              value={content}
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
