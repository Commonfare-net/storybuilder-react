import React, { Component } from 'react';
import { arrayOf, number, string, array, func, shape } from 'prop-types';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import 'react-tagsinput/react-tagsinput.css';
import './StoryTags.css';

defineMessages({
  add_tag: {
    id: 'story.add_tag',
    defaultMessage: "Add a tag"
  }
})

class StoryTags extends Component {
  static propTypes = {
    tags: arrayOf(shape({
      id: number,
      name: string.isRequired
    })),
    availableTags: array.isRequired,
    onChange: func.isRequired,
    intl: intlShape.isRequired
  }

  static defaultProps = {
    tags: [],
    availableTags: []
  }

  autosuggestRenderInput = ({ addTag, ...props }) => {
    const handleOnChange = (e, { newValue, method }) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        props.onChange(e)
      }
    }

    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length
    const { availableTags } = this.props;

    let suggestions = availableTags.filter((tag) => {
      return tag.name.toLowerCase().slice(0, inputLength) === inputValue
    })

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.id || suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{...props, onChange: handleOnChange}}
        onSuggestionSelected={(e, {suggestion}) => {
          addTag({ ...suggestion })
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
      />
    )
  }

  handleChange = (tags) => {
    const { onChange, availableTags } = this.props;
    const lastTag = tags[tags.length - 1]

    // check if the user entered an available tag without autocompleting
    if (!lastTag.hasOwnProperty('id')) {
      const tagToUse = availableTags.find((item) => item.name === lastTag.name);
      if (tagToUse) {
        tags.splice(tags.length - 1, 1, tagToUse)
      }
    }

    onChange(tags);
  }

  render() {
    const { intl, tags } = this.props;

    return (
      <div className="story-builder__tags-wrapper">
        <label>Tags</label>
        <TagsInput
          value={tags}
          renderInput={this.autosuggestRenderInput}
          onlyUnique={true}
          className="story-builder__tags"
          inputProps={{
            className: "story-builder__tag-input",
            placeholder: intl.formatMessage({ id: 'story.add_tag' })
          }}
          tagDisplayProp="name"
          onChange={this.handleChange} />
      </div>
    )
  }
}

export default injectIntl(StoryTags);
