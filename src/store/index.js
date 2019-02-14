import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

// Hooks in the Redux DevTools so you can inspect things
// like actions and the state in the Chrome DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

/**
 * Configures and creates the store
 * @param {any} initialState The initial state for the store
 */
export default function configureStore(initialState) {
  // When we create the store, we pass in the root reducer,
  // the initial state object, and then we also compose
  // any middleware we want, whether it is a logging middleware
  // or something else.
  // Here, we are applying something called a 'thunk'. This
  // lets us dispatch not only normal actions, but also functions.
  // We can now do asynchronous calls within redux, thereby
  // moving our business logic (like API calls) out of our
  // components and into a single, re-useable, place.
  // https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
};
