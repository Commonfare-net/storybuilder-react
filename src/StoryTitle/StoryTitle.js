import React, { Component } from 'react';
import { string, func } from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import './StoryTitle.css';

defineMessages({
  title: {
    id: 'story.title',
    defaultMessage: 'Title'
  }
})

class StoryTitle extends Component {
  static propTypes = {
    title: string,
    onChange: func.isRequired,
    intl: intlShape.isRequired
  }

  render() {
    const { title, onChange, intl } = this.props;

    return (
      <ReactQuill
        theme={null}
        defaultValue={title}
        placeholder={intl.formatMessage({ id: 'story.title' })}
        onChange={(text) => onChange(sanitizeHtml(text, { allowedTags: [] }))}
        className="story-builder__title" />
    )
  }
}

export default injectIntl(StoryTitle);
