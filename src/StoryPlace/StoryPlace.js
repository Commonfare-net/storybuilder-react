import React, { Component } from 'react';
import { string, func } from 'prop-types';
import ReactQuill from 'react-quill';
import sanitizeHtml from 'sanitize-html';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import './StoryPlace.css';

defineMessages({
  place: {
    id: 'story.place',
    defaultMessage: 'Place'
  }
});

class StoryPlace extends Component {
  static propTypes = {
    place: string,
    onChange: func.isRequired,
    intl: intlShape.isRequired
  }

  render() {
    const { place, onChange, intl } = this.props;

    return (
      <ReactQuill
        theme={null}
        defaultValue={place}
        placeholder={intl.formatMessage({ id: 'story.place' })}
        onChange={text => onChange(sanitizeHtml(text, { allowedTags: [] }))}
        className="story-builder__place" />
    )
  }
}

export default injectIntl(StoryPlace);
