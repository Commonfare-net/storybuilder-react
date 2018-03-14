import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import isEmpty from 'lodash/isEmpty';

import StoryItem from './StoryItem';

import './ImageStoryItem.css';

export default class ImageStoryItem extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    editing: PropTypes.bool
  }

  static defaultProps = {
    content: "",
    editing: false
  }

  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      uploading: false,
      uploadProgress: 0
    }
  }

  openFileChooser = () => {
    this.fileInput.click()
  }

  fileSelectedHandler = (event) => {
    const { imageUploadHandler, onSave } = this.props;
    const selectedFile = event.target.files[0];

    // create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        content: reader.result
      })
    }
    reader.readAsDataURL(selectedFile);

    this.setState({
      uploading: true
    }, () => {
      imageUploadHandler(selectedFile, (progress) => this.setState({ uploadProgress: progress }))
      .then(imageUrl => {
        this.setState({
          content: imageUrl
        }, () => onSave(this.state.content))
      })
      .finally(() => {
        this.setState({
          uploading: false,
          uploadProgress: 100
        })
      })
    });
  }

  render() {
    const { onSave, onRemove } = this.props;
    const { content, uploading, uploadProgress } = this.state;

    const imgClassName = uploading ? 'image-story-item__image--uploading' : 'image-story-item__image';

    return (
      <StoryItem
        className="image-story-item"
        icon="image"
        content={content}
        editing={this.props.editing}
        onOpen={() => isEmpty(content) && this.openFileChooser()}
        onSave={() => onSave(content)}
        onRemove={onRemove}>
        <div className="image-story-item__uploader">
          <div className="image-story-item__image-wrapper">
            <input ref={fileInput => this.fileInput = fileInput} type="file" onChange={this.fileSelectedHandler} style={{ display: 'none' }}/>
            <img src={content} style={{ opacity: `${uploadProgress / 100}` }}/>
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
      </StoryItem>
    )
  }
}
