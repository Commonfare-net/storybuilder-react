import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';
import AutoLinks from 'quill-auto-links';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import StoryItem from './StoryItem';
import './TextStoryItem.css';

defineMessages({
  placeholder: {
    id: 'text_story_item.placeholder',
    defaultMessage: 'Write something...'
  }
})

Quill.register('modules/autoLinks', AutoLinks);

class TextStoryItem extends Component {
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
  save = () => this.props.onSave(this.state.content)

  render() {
    const { onRemove, editing, disabled, intl } = this.props;

    const editorOptions = {
      theme: "bubble",
      placeholder: intl.formatMessage({
        id: 'text_story_item.placeholder'
      }),
      modules: {
        autoLinks: true,
        toolbar: ['bold', 'italic', 'underline', 'link', 'blockquote']
      }
    }

    return (
      <StoryItem
        className="text-story-item"
        icon="font"
        editing={editing}
        disabled={disabled}
        content={this.state.content}
        onOpen={this.autoFocusEditor}
        onSave={this.save}
        onRemove={onRemove}>
        <ReactQuill
          ref={(el) => this.reactQuillRef = el}
          value={this.state.content}
          onChange={this.handleChange}
          {...editorOptions}
        />
      </StoryItem>
    )
  }
}

export default injectIntl(TextStoryItem);
