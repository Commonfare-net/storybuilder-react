import React, { PureComponent } from 'react';
import { element, func, string, oneOfType, arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './StoryItemEditor.css';

export default class StoryItemEditor extends PureComponent {
  static propTypes = {
    children: oneOfType([
      element,
      arrayOf(element),
    ]),
    onSave: func.isRequired,
    onRemove: func.isRequired,
    className: string
  }

  render() {
    const { children, onSave, onRemove, className } = this.props;

    return (
      <div className={`story-item story-item--editing ${className}`}>
        <div className="story-item__editor">
          {children}
          <div className="story-item__buttons">
            <button className="story-item__remove-button"
              onClick={onRemove}>
              <FormattedMessage id='story_item.remove' defaultMessage='Remove' />
            </button>
            <button
              className="story-item__done-button"
              onClick={onSave}>
              <FormattedMessage id='story_item.done' defaultMessage='Done' />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
