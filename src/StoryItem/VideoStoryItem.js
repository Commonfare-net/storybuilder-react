import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import ReactQuill from 'react-quill';
import isEmpty from 'lodash/isEmpty';
import sanitizeHtml from 'sanitize-html';
import embed from 'embed-video';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import StoryItem from './StoryItem';

defineMessages({
  placeholder: {
    id: 'video_story_item.placeholder',
    defaultMessage: 'Paste the URL of a video from YouTube, Vimeo or DailyMotion'
  }
})

class VideoStoryItem extends Component {
  static propTypes = {
    content: string.isRequired,
    url: string.isRequired,
    onSave: func.isRequired,
    onRemove: func.isRequired,
    editing: bool,
    disabled: bool,
    intl: intlShape.isRequired
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

  autoFocusEditor = () => {
    const { content } = this.state;

    if (isEmpty(content)) {
      this.reactQuillRef.getEditor().focus()
    }
  }

  save = () => {
    const { onSave } = this.props;
    const { url, content } = this.state;

    onSave({ url, content })
  }

  render() {
    const { onRemove, editing, disabled, intl } = this.props;
    const { url, content, unsupported } = this.state;

    const editorOptions = {
      theme: null,
      placeholder: intl.formatMessage({
        id: 'video_story_item.placeholder'
      })
    }

    return (
      <StoryItem
        className="video-story-item"
        icon='film'
        editing={editing}
        disabled={disabled}
        content={url}
        onOpen={this.autoFocusEditor}
        onSave={this.save}
        onRemove={onRemove}>
        <div>
          {unsupported &&
            <p>
              <FormattedMessage id='video_story_item.unsupported_source' tagName='strong'>
                Unsupported source. Please paste a URL from YouTube, Vimeo or DailyMotion
              </FormattedMessage>
            </p>
          }
          {isEmpty(content) &&
            <ReactQuill
              ref={(el) => this.reactQuillRef = el}
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

export default injectIntl(VideoStoryItem);
