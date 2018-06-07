import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import FontAwesome from 'react-fontawesome';
import ReactQuill from 'react-quill';
import isEmpty from 'lodash/isEmpty';
import sanitizeHtml from 'sanitize-html';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import StoryItem from './StoryItem';

import './ImageStoryItem.css';

defineMessages({
  placeholder: {
    id: 'image_story_item.placeholder',
    defaultMessage: 'Write a caption...'
  }
})

class ImageStoryItem extends Component {
  static propTypes = {
    content: string,
    caption: string,
    imageUploadHandler: func.isRequired,
    onSave: func.isRequired,
    onRemove: func.isRequired,
    editItem: func.isRequired,
    editing: bool,
    disabled: bool,
    intl: intlShape.isRequired
  }

  static defaultProps = {
    content: '',
    caption: '',
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

  componentDidMount() {
    if (isEmpty(this.state.content)) {
      this.openFileChooser()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.editing && !prevProps.editing && isEmpty(this.state.content)) {
      this.openFileChooser()
    }
    // 
    // if (this.contentChanged(prevState) || this.captionChanged(prevState)) {
    //   this.save()
    // }
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

  // handleOpen = () => isEmpty(this.state.content) && this.openFileChooser()

  save = () => {
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
    const { disabled, editing, editItem, onRemove, intl } = this.props;
    const { content, caption, uploading, uploadProgress, preview } = this.state;

    const editorOptions = {
      theme: null,
      placeholder: intl.formatMessage({
        id: 'image_story_item.placeholder'
      }),
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
        onOpen={editItem}
        onSave={this.save}
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
      </StoryItem>
    )
  }
}

export default injectIntl(ImageStoryItem);
