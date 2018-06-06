import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import storyBuilderReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(api, initialState) {
  return createStore(
    storyBuilderReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
  )
}
