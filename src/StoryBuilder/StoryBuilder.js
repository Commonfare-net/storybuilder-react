import React, { Component } from 'react';
import { string, number, func, shape, arrayOf } from 'prop-types';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { setTitle, setPlace, setTags, addItem, save } from '../actions';

import Title from '../StoryTitle/StoryTitle';
import Place from '../StoryPlace/StoryPlace';
import Tags from '../StoryTags/StoryTags';
import StoryContent from '../StoryContent/StoryContent';
import AddButton from '../AddButton/AddButton';

// import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
// import isEqual from 'lodash/isEqual';

import './StoryBuilder.css';

import translations from '../translations';

class StoryBuilder extends Component {
  static propTypes = {
    locale: string,
    title: string,
    place: string,
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
    onSave: func.isRequired,
    onTitleChange: func.isRequired,
    onPlaceChange: func.isRequired,
    onTagsChange: func.isRequired,
    addItem: func.isRequired
  }

  static defaultProps = {
    locale: 'en',
    imageUploadHandler: function() {},
    imageDeleteHandler: function() {},
    onSave: function() {}
  }

  constructor(props) {
    super(props);
    this.state = {
      saving: false
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.saving === false && this.state.saving) {
  //     this.props.onSave(this.state)
  //     .finally(() => {
  //       this.setState({ saving: false })
  //     })
  //   }
  //
  //   if (!isEqual(prevProps.title, this.props.title) ||
  //       !isEqual(prevProps.place, this.props.place) ||
  //       !isEqual(prevProps.tags, this.props.tags)) {
  //     this.save()
  //   }
  // }

  canSave = () => !isEmpty(this.props.title) && !isEmpty(this.props.place)

  // save = debounce(() => {
  //   if (this.canSave() && !this.state.saving) {
  //     this.props.save()
  //   }
  // }, 1000)

  render() {
    const { locale, imageUploadHandler, imageDeleteHandler, title, onTitleChange, place, onPlaceChange, availableTags, tags, onTagsChange, addItem } = this.props;

    return (
      <IntlProvider locale={locale} messages={translations[locale]}>
        <div className="story-builder">
          <Title title={title} onChange={onTitleChange} />
          <Place place={place} onChange={onPlaceChange} />
          {this.canSave() &&
            <Tags availableTags={availableTags} tags={tags} onChange={onTagsChange} />
          }
          <StoryContent
            disabled={!this.canSave()}
            imageUploadHandler={imageUploadHandler}
            imageDeleteHandler={imageDeleteHandler}
          />
          {this.canSave() &&
            <AddButton onAdd={addItem} />
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
    availableTags,
    tags
  }
}

const mapDispatchToProps = {
  onTitleChange: setTitle,
  onPlaceChange: setPlace,
  onTagsChange: setTags,
  addItem: addItem,
  save: save
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryBuilder);
