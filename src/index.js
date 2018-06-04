import 'babel-polyfill';
import React from 'react';
import { string, arrayOf, oneOf, shape, number, object } from 'prop-types';
import { Provider } from 'react-redux';
import store from './store';

// import external styles
import 'react-quill/dist/quill.bubble.css';

import StoryBuilderInner from './StoryBuilder/StoryBuilder';

function StoryBuilder(props) {
  const { title, place, availableTags, tags, template, content_json, api, ...otherProps } = props;

  return (
    <Provider store={store({ title, place, availableTags, tags, template, content_json }, api)}>
      <StoryBuilderInner {...otherProps} />
    </Provider>
  )
}

StoryBuilder.propTypes ={
  locale: string,
  title: string,
  place: string,
  availableTags: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired
  })),
  tags: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired
  })),
  template: arrayOf(shape({
    id: string.isRequired,
    type: oneOf(['text', 'largeText', 'image', 'video']).isRequired,
    content: string.isRequired,
    caption: string
  })),
  content_json: arrayOf(shape({
    id: string.isRequired,
    type: oneOf(['text', 'largeText', 'image', 'video']).isRequired,
    content: string.isRequired,
    caption: string
  })),
  api: object
}

export default StoryBuilder;
