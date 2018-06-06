import React, { Component } from 'react';
import { number, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { newItem, nextTemplateItem } from '../actions';

import FontAwesome from 'react-fontawesome';

import './AddButton.css';

class AddButton extends Component {
  static propTypes = {
    newItem: func.isRequired,
    nextTemplateItem: func.isRequired,
    itemsLeftInTemplate: number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  openAddMenu = () => {
    this.setState(prevState => ({ active: !prevState.active }))
  }

  render() {
    const { itemsLeftInTemplate, newItem, nextTemplateItem } = this.props;
    const { active } = this.state;

    return (
      <div className={`story-builder-add ${active ? 'story-builder-add--active' : '' }`}>
        <button
          className="story-builder-add__button"
          onClick={() => itemsLeftInTemplate > 0 ? nextTemplateItem() : this.openAddMenu()}>
          <FontAwesome
            name="plus"
            size="3x"
            className="fa-fw"
            style={{ lineHeight: '60px' }} />
        </button>
        <div className="story-builder-add__type">
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => newItem({ type: 'text', content: '' }))}>
            <FontAwesome name="font" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.text_story_item"
              defaultMessage="Text"
            />
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => newItem({ type: 'largeText', content: '' }))}>
            <FontAwesome name="text-height" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.largeText_story_item"
              defaultMessage="Large Text"
            />
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => newItem({ type: 'image', content: '' }))}>
            <FontAwesome name="image" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.image_story_item"
              defaultMessage="Image"
            />
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => newItem({ type: 'video', content: '' }))}>
            <FontAwesome name="film" size="3x" className="fa-fw" /><br />
            <FormattedMessage
              id="add.video_story_item"
              defaultMessage="Video"
            />
          </button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    itemsLeftInTemplate: state.template.length
  }),
  {
    newItem,
    nextTemplateItem
  }
)(AddButton)
