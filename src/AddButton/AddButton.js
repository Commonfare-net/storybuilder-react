import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import FontAwesome from 'react-fontawesome';

import './AddButton.css';

export default class AddButton extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  render() {
    const { onAdd } = this.props;
    const { active } = this.state;

    return (
      <div className={`story-builder-add ${active ? 'story-builder-add--active' : '' }`}>
        <button
          className="story-builder-add__button"
          onClick={() => this.setState(prevState => ({ active: !prevState.active }))}>
          <FontAwesome
            name="plus"
            size="3x"
            className="fa-fw"
            style={{ lineHeight: '60px' }} />
        </button>
        <div className="story-builder-add__type">
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => onAdd({ type: 'text', content: '' }))}>
            <FontAwesome name="font" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.text_storyItem"
              defaultMessage="Text"
            />
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => onAdd({ type: 'largeText', content: '' }))}>
            <FontAwesome name="text-height" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.largeText_storyItem"
              defaultMessage="Large Text"
            />
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => onAdd({ type: 'image', content: '' }))}>
            <FontAwesome name="image" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.image_storyItem"
              defaultMessage="Image"
            />
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => onAdd({ type: 'video', content: '' }))}>
            <FontAwesome name="film" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.video_storyItem"
              defaultMessage="Video"
            />
          </button>
        </div>
      </div>
    )
  }
}
