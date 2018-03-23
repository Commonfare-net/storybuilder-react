import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import Title from '../StoryTitle/StoryTitle';
import Place from '../StoryPlace/StoryPlace';
import Tags from '../StoryTags/StoryTags';
import StoryContent from '../StoryContent/StoryContent';
import AddButton from '../AddButton/AddButton';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import './StoryBuilder.css';

const translations = {
  it: require('../translations/it.json')
}

class StoryBuilder extends Component {
  static propTypes = {
    locale: PropTypes.string,
    title: PropTypes.string,
    place: PropTypes.string,
    availableTags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    content_json: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'largeText', 'image', 'video']).isRequired,
      content: PropTypes.string.isRequired,
      caption: PropTypes.string
    })).isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
    imageDeleteHandler: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  static defaultProps = {
    locale: 'en',
    content_json: []
  }

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      place: props.place,
      tags: props.tags,
      content_json: props.content_json,
      saving: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.saving === false && this.state.saving) {
      this.props.onSave(this.state)
      .finally(() => {
        this.setState({ saving: false })
      })
    }

    if (!isEqual(prevState.title, this.state.title) ||
        !isEqual(prevState.place, this.state.place) ||
        !isEqual(prevState.tags, this.state.tags) ||
        !isEqual(prevState.content_json, this.state.content_json)) {
      this.save()
    }
  }

  canSave = () => !isEmpty(this.state.title) && !isEmpty(this.state.place)

  save = debounce(() => {
    if (this.canSave() && !this.state.saving) {
      this.setState({
        saving: true
      })
    }
  }, 1000)

  updateTitle = (newTitle) => {
    this.setState({ title: newTitle })
  }

  updatePlace = (newPlace) => {
    this.setState({ place: newPlace })
  }

  updateTags = (newTags) => {
    this.setState({ tags: newTags })
  }

  addItem = (item) => {
    const { content_json } = this.state;

    this.setState({
      content_json: [
        ...content_json,
        {
          ...item,
          editing: true,
          id: `${item.type}-${content_json.filter(i => i.type === item.type).length + 1}`
        }
      ]
    });
  }

  updateContent = (newContent) => {
    this.setState({ content_json: newContent })
  }

  render() {
    const { locale, availableTags, imageUploadHandler, imageDeleteHandler } = this.props;
    const { title, place, tags, content_json } = this.state;

    return (
      <IntlProvider locale={locale} messages={translations[locale]}>
        <div className="story-builder">
          <Title title={title} onChange={this.updateTitle} />
          <Place place={place} onChange={this.updatePlace} />
          {this.canSave() &&
            <Tags availableTags={availableTags} tags={tags} onChange={this.updateTags} />
          }
          <StoryContent
            items={content_json}
            disabled={!this.canSave()}
            onChange={this.updateContent}
            imageUploadHandler={imageUploadHandler}
            imageDeleteHandler={imageDeleteHandler}
          />
          {this.canSave() &&
            <AddButton
              onAdd={this.addItem}
            />
          }
        </div>
      </IntlProvider>
    );
  }
}
export default StoryBuilder;
