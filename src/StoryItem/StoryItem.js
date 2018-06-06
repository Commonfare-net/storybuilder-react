import React, { Component } from 'react';
import { string, bool, func, element, oneOfType, arrayOf } from 'prop-types';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import CollapsedStoryItem from './CollapsedStoryItem';
import StoryItemEditor from './StoryItemEditor';

defineMessages({
  confirm: {
    id: 'story_item.confirm_remove',
    defaultMessage: 'Are you sure? This cannot be undone'
  }
})

class StoryItem extends Component {
  static propTypes = {
    icon: string.isRequired,
    disabled: bool,
    editing: bool,
    content: string.isRequired,
    onOpen: func,
    onSave: func.isRequired,
    onRemove: func.isRequired,
    children: oneOfType([
      element,
      arrayOf(element),
    ]),
    className: string,
    intl: intlShape
  }

  static defaultProps = {
    disabled: false,
    editing: false
  }

  // Trigger onOpen if the item is added with editing set to true
  componentDidMount() {
    const { onOpen, editing } = this.props;

    if (editing && onOpen) {
      onOpen();
    }
  }

  // startEditing = () => {
  //   const { disabled, onOpen } = this.props;
  //   const { editing } = this.state;
  //
  //   if (!disabled && !editing) {
  //     this.setState({
  //       editing: true
  //     }, () => { if (onOpen) this.props.onOpen() })
  //   }
  // }

  // doneEditing = () => {
  //   const { onSave } = this.props;
  //
  //   this.setState({ editing: false }, onSave)
  // }

  remove = () => {
    const { content, onRemove, intl: { formatMessage } } = this.props;

    if (confirm(formatMessage({ id: 'story_item.confirm_remove' }))) {
      onRemove(content)
    }
  }

  render() {
    const { editing, icon, content, children, className, onOpen, onSave } = this.props;

    if (editing) {
      return (
        <StoryItemEditor
          onSave={onSave}
          onRemove={this.remove}
          className={className}>
          {children}
        </StoryItemEditor>
      )
    } else {
      return (
        <CollapsedStoryItem
          icon={icon}
          content={content}
          onClick={onOpen}
          className={className}
        />
      );
    }
  }
}

export default injectIntl(StoryItem);
