import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import StoryItem from './StoryItem';

import './LargeTextStoryItem.css';

defineMessages({
  placeholder: {
    id: 'largeText_story_item.placeholder',
    defaultMessage: 'Write something that stands out...'
  }
})

class LargeTextStoryItem extends Component {
  static propTypes = {
    content: string.isRequired,
    onSave: func.isRequired,
    onRemove: func.isRequired,
    editing: bool,
    disabled: bool,
    intl: intlShape.isRequired
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

  handleChange = (text) => {
    this.setState({ content: text });
  }

  autoFocusEditor = () => this.reactQuillRef.getEditor().focus()

  save = () => {
    const { onSave } = this.props;
    const { content } = this.state;

    onSave(sanitizeHtml(content, {
      allowedTags: [],
      textFilter: text => text.replace(/&quot;/g, '"')
      // https://github.com/punkave/sanitize-html/issues/96
    }));
  }

  render() {
    const { onRemove, editing, disabled, intl } = this.props;
    const { content } = this.state;

    const editorOptions = {
      theme: null,
      placeholder: intl.formatMessage({
        id: 'largeText_story_item.placeholder'
      })
    }

    return (
      <StoryItem
        className="large-text-story-item"
        icon="text-height"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onOpen={this.autoFocusEditor}
        onSave={this.save}
        onRemove={onRemove}>
        <ReactQuill
          ref={(el) => this.reactQuillRef = el}
          value={content}
          onChange={this.handleChange}
          {...editorOptions} />
      </StoryItem>
    )
  }
}

export default injectIntl(LargeTextStoryItem);
