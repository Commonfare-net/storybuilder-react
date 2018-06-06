import 'babel-polyfill';
import React, { Component} from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from './store';

// import external styles
import 'react-quill/dist/quill.bubble.css';

import StoryBuilder from './StoryBuilder/StoryBuilder';

class StoryBuilderWithApi extends Component {

  static propTypes = {
    api: object,
    initialState: object
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { api, initialState } = this.props;
    const store = configureStore(api, initialState)

    return (
      <Provider store={store}>
        <StoryBuilder
          imageUploadHandler={api.imageUploadHandler}
          imageDeleteHandler={api.imageDeleteHandler} />
      </Provider>
    )
  }
}

export default StoryBuilderWithApi;
