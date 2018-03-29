import React, { Component } from 'react';
import { string, bool, func, element, oneOfType, arrayOf } from 'prop-types';

import CollapsedStoryItem from './CollapsedStoryItem';
import StoryItemEditor from './StoryItemEditor';

export default class StoryItem extends Component {
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
    className: string
  }

  static defaultProps = {
    disabled: false,
    editing: false
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: props.editing
    }
  }

  // Trigger onOpen if the item is added with editing set to true
  componentDidMount() {
    const { onOpen } = this.props;
    const { editing } = this.state;

    if (editing && onOpen) {
      onOpen();
    }
  }

  // Close the item if it is being edited and it becomes disabled for any reason
  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled && this.state.editing) {
      this.setState({ editing: false });
    }
  }

  toggleEditor = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  startEditing = () => {
    const { disabled, onOpen } = this.props;
    const { editing } = this.state;

    if (!disabled && !editing) {
      this.setState({
        editing: true
      }, () => { if (onOpen) this.props.onOpen() })
    }
  }

  doneEditing = () => {
    const { onSave } = this.props;

    this.setState({ editing: false }, onSave)
  }

  remove = () => {
    const { content, onRemove } = this.props;

    if (confirm("Are you sure? This cannot be undone")) {
      onRemove(content)
    }
  }

  render() {
    const { icon, content, children, className } = this.props;
    const { editing } = this.state;

    if (editing) {
      return (
        <StoryItemEditor
          onSave={this.doneEditing}
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
          onClick={this.startEditing}
          className={className}
        />
      );
    }
  }
}
