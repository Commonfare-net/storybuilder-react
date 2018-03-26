import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ReactQuill from 'react-quill';
import isEmpty from 'lodash/isEmpty';
import sanitizeHtml from 'sanitize-html';

import toolbarOptions from './toolbarOptions';
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
    if (this.contentChanged(prevState) || this.captionChanged(prevState)) {
      this.saveItem()
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

  handleChange = (caption) => this.setState({ caption })

  saveItem = () => {
    const { uploading, content, caption } = this.state;
    const { onSave } = this.props;

    if (!uploading) {
      onSave({
        content,
        caption: sanitizeHtml(caption, { allowedTags: [] })
      })
    }
  }

  render() {
    const { disabled, editing, onRemove } = this.props;
    const { content, caption, uploading, uploadProgress, preview } = this.state;

    const editorOptions = {
      ...toolbarOptions,
      theme: null,
      placeholder: 'Write a caption',
      modules: {
        toolbar: false
      }
    }

    return (
      <StoryItem
        className="image-story-item"
        icon="image"
        content={caption || content}
        disabled={disabled}
        editing={editing}
        onOpen={() => isEmpty(content) && this.openFileChooser()}
        onSave={this.saveItem}
        onRemove={onRemove}>
        <div className="image-story-item__uploader">
          <div className="image-story-item__image-wrapper">
            <input ref={fileInput => this.fileInput = fileInput} type="file" onChange={this.fileSelectedHandler} style={{ display: 'none' }}/>
            <img src={uploading ? preview : content} style={{ opacity: `${uploadProgress / 100}` }}/>
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
        <ReactQuill
          {...editorOptions}
          value={caption}
          onChange={this.handleChange}
        />
        {/* <Editor
          text={caption}
          options={editorOptions}
          onChange={(caption) => this.setState({ caption })}
        /> */}
      </StoryItem>
    )
  }
}
