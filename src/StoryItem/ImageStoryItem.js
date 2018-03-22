import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Editor from 'react-medium-editor';
import MediumEditorAutofocus from 'medium-editor-autofocus';
import isEmpty from 'lodash/isEmpty';

import StoryItem from './StoryItem';

import './ImageStoryItem.css';

export default class ImageStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string,
    caption: PropTypes.string,
    imageUploadHandler: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    content: "",
    editing: false,
    disabled: false
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      caption: props.caption,
      uploading: false,
      uploadProgress: 100
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { content, caption } = this.state;
    // content changed
    if (!this.state.uploading && (this.contentChanged(prevState) || this.captionChanged(prevState))) {
      this.props.onSave({ content, caption });
    }
  }

  contentChanged = (prevState) => prevState.content !== this.state.content
  captionChanged = (prevState) => prevState.caption !== this.state.caption

  openFileChooser = () => {
    this.fileInput.click()
  }

  fileSelectedHandler = (event) => {
    const { imageUploadHandler } = this.props;
    const selectedFile = event.target.files[0];

    // create a preview
    const reader = new FileReader();
    reader.onloadend = () => this.setState({ preview: reader.result })
    reader.readAsDataURL(selectedFile);

    this.setState({
      uploading: true,
      uploadProgress: 0
    }, () => {
      imageUploadHandler(selectedFile, (progress) => this.setState({ uploadProgress: progress }))
      .then(url => {
        this.setState({
          preview: undefined,
          content: url,
          uploading: false,
          uploadProgress: 100
        })
      })
      .catch(() => {
        this.setState({
          preview: undefined,
          content: undefined,
          uploading: false,
          uploadProgress: 100
        })
      })
    });
  }

  render() {
    const { disabled, editing, onSave, onRemove } = this.props;
    const { content: url, caption, uploading, uploadProgress, preview } = this.state;

    const editorOptions = {
      disableEditing: disabled || uploading,
      disableReturn: true,
      disableDoubleReturn: true,
      disableExtraSpaces: true,
      toolbar: false,
      placeholder: {
        text: 'Write a caption',
        hideOnClick: false
      },
      extensions: {
        imageDragging: {},
        autofocus: new MediumEditorAutofocus()
      }
    }

    return (
      <StoryItem
        className="image-story-item"
        icon="image"
        content={caption || url}
        disabled={disabled}
        editing={editing}
        onOpen={() => isEmpty(url) && this.openFileChooser()}
        onSave={() => !uploading && onSave({ url, caption })}
        onRemove={onRemove}>
        <div className="image-story-item__uploader">
          <div className="image-story-item__image-wrapper">
            <input ref={fileInput => this.fileInput = fileInput} type="file" onChange={this.fileSelectedHandler} style={{ display: 'none' }}/>
            <img src={uploading ? preview : url} style={{ opacity: `${uploadProgress / 100}` }}/>
            {!uploading &&
              <button className="image-story-item__upload-button" onClick={this.openFileChooser}>
                <FontAwesome name='upload' size='2x' />
              </button>
            }
            {uploading &&
              <div className="image-story-item__upload-progress" style={{ width: `${uploadProgress}%` }}></div>
            }
          </div>
        </div>
        <Editor
          text={caption}
          options={editorOptions}
          onChange={(caption) => this.setState({ caption })}
        />
      </StoryItem>
    )
  }
}
