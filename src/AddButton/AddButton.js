import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            Text
          </button>
          <button
            className="story-builder-add__type-select"
            onClick={() => this.setState({ active: false }, () => onAdd({ type: 'image', content: '' }))}>
            <FontAwesome name="image" size="3x" className="fa-fw" /><br />
            Image
          </button>
        </div>
      </div>
    )
  }
}
