import React, { Component } from 'react';
import { string, number, bool, func, shape, arrayOf } from 'prop-types';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { setTitle, setPlace, setTags, save } from '../actions';
import isEmpty from 'lodash/isEmpty';

import Title from '../StoryTitle/StoryTitle';
import Place from '../StoryPlace/StoryPlace';
import Tags from '../StoryTags/StoryTags';
import StoryContent from '../StoryContent/StoryContent';
import AddButton from '../AddButton/AddButton';

// import debounce from 'lodash/debounce';
// import isEmpty from 'lodash/isEmpty';
// import isEqual from 'lodash/isEqual';

import './StoryBuilder.css';

import translations from '../translations';

class StoryBuilder extends Component {
  static propTypes = {
    locale: string,
    title: string,
    place: string,
    hasTitleAndPlace: bool,
    availableTags: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })),
    tags: arrayOf(shape({
      id: number,
      name: string.isRequired
    })),
    imageUploadHandler: func.isRequired,
    imageDeleteHandler: func.isRequired,
    onTitleChange: func.isRequired,
    onPlaceChange: func.isRequired,
    onTagsChange: func.isRequired
  }

  static defaultProps = {
    locale: 'en',
    imageUploadHandler: function() {},
    imageDeleteHandler: function() {},
  }

  render() {
    const {
      locale,
      imageUploadHandler,
      imageDeleteHandler,
      title,
      onTitleChange,
      place,
      onPlaceChange,
      availableTags,
      tags,
      onTagsChange,
      hasTitleAndPlace
    } = this.props;

    return (
      <IntlProvider locale={locale} messages={translations[locale]}>
        <div className="story-builder">
          <Title title={title} onChange={onTitleChange} />
          <Place place={place} onChange={onPlaceChange} />
          <StoryContent
            imageUploadHandler={imageUploadHandler}
            imageDeleteHandler={imageDeleteHandler}
          />
          {hasTitleAndPlace &&
            <AddButton />
          }
          {hasTitleAndPlace &&
            <Tags availableTags={availableTags} tags={tags} onChange={onTagsChange} />
          }
        </div>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => {
  const { locale, title, place, availableTags, tags } = state;
  return {
    locale,
    title,
    place,
    hasTitleAndPlace: !isEmpty(title) && !isEmpty(place),
    availableTags,
    tags
  }
}

const mapDispatchToProps = {
  onTitleChange: setTitle,
  onPlaceChange: setPlace,
  onTagsChange: setTags,
  save: save
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryBuilder);
