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

    const modules = {
      keyboard: {
        bindings: {
          tab: false,
          handleEnter: {
            key: 13,
            handler: function() {
              // Do nothing
            }
          }
        }
      }
    }

    return (
      <ReactQuill
        theme={null}
        modules={modules}
        defaultValue={place}
        placeholder={intl.formatMessage({ id: 'story.place' })}
        onChange={text => onChange(sanitizeHtml(text, { allowedTags: [] }))}
        className="story-builder__place" />
    )
  }
}

export default injectIntl(StoryPlace);
