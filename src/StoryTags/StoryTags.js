import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';

import 'react-tagsinput/react-tagsinput.css';
import './StoryTags.css';

export default class StoryTags extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired
    })),
    availableTags: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired
  }

  static defaultProps = {
    tags: [],
    availableTags: []
  }

  constructor(props) {
    super(props);
    this.state = { tags: props.tags };
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
    this.setState({ tags }, () => this.props.onSave(this.state.tags));
  }

  render() {
    return (
      <div className="story-builder__tags-wrapper">
        <label>Tags</label>
        <TagsInput
          value={this.state.tags}
          renderInput={this.autosuggestRenderInput}
          onlyUnique={true}
          className="story-builder__tags"
          inputProps={{ className: "story-builder__tag-input", placeholder: "Add a tag" }}
          tagDisplayProp="name"
          onChange={this.handleChange} />
      </div>
    )
  }
}
