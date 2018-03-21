import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Editor from 'react-medium-editor';
import MediumEditorAutofocus from 'medium-editor-autofocus';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import StoryItem from './StoryItem';

import './ImageStoryItem.css';

export default class ImageStoryItem extends Component {
  static propTypes = {
    content: PropTypes.shape({
      url: PropTypes.string,
      caption: PropTypes.string
    }).isRequired,
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
      uploading: false,
      uploadProgress: 100
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // content changed
    if (!isEqual(prevState.content, this.state.content)) {
      this.props.onSave(this.state.content);
    }
  }

  openFileChooser = () => {
    this.fileInput.click()
  }

  fileSelectedHandler = (event) => {
    const { imageUploadHandler } = this.props;
    const selectedFile = event.target.files[0];

    // create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState((prevState) => ({
        content: {
          url: reader.result,
          caption: prevState.content.caption
        }
      }))
    }
    reader.readAsDataURL(selectedFile);

    this.setState({
      uploading: true,
      uploadProgress: 0
    }, () => {
      imageUploadHandler(selectedFile, (progress) => this.setState({ uploadProgress: progress }))
      .then(url => {
        this.setState((prevState) => ({
          content: {
            url,
            caption: prevState.content.caption
          }
        }))
      })
      .finally(() => {
        this.setState({
          uploading: false,
          uploadProgress: 100
        })
      })
    });
  }

  setCaption = (caption) => {
    this.setState((prevState) => ({
      content: {
        url: prevState.content.url,
        caption
      }
    }))
  }

  render() {
    const { disabled, editing, onSave, onRemove } = this.props;
    const { content: { url, caption }, uploading, uploadProgress } = this.state;

    const editorOptions = {
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
        onSave={() => onSave({ url, caption })}
        onRemove={onRemove}>
        <div className="image-story-item__uploader">
          <div className="image-story-item__image-wrapper">
            <input ref={fileInput => this.fileInput = fileInput} type="file" onChange={this.fileSelectedHandler} style={{ display: 'none' }}/>
            <img src={url} style={{ opacity: `${uploadProgress / 100}` }}/>
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
          onChange={this.setCaption}
        />
      </StoryItem>
    )
  }
}
