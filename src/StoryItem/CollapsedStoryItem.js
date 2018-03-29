import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';

import FontAwesome from 'react-fontawesome';
import Dotdotdot from 'react-dotdotdot';

import './CollapsedStoryItem.css';

export default class CollapsedStoryItem extends PureComponent {
  static propTypes = {
    icon: string.isRequired,
    content: string.isRequired,
    onClick: func.isRequired,
    className: string,
  }

  static defaultProps = {
    content: ''
  }

  render() {
    const { icon, content, onClick, className } = this.props;

    return (
      <div className={`story-item ${className}`} onClick={onClick}>
        <div className="story-item__icon">
          <FontAwesome name={icon} size="3x" className="fa-fw"/>
        </div>
        <div className="story-item__content">
          <Dotdotdot clamp={3}>{content.replace(/(<[^>]+>)|(&nbsp;)/g, ' ')}</Dotdotdot>
        </div>
      </div>
    )
  }
}
