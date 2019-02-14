import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';

import Endpoints from './Endpoints';
import Errors from './Errors';

// Create the redux store
const store = configureStore();

/**
 * The application itself; this is the starting point to
 * the whole thing.
 *
 * It wraps the application code with a `Provider`
 * component which is what connects react with redux.
 * It used react's `Context` API under the covers to
 * persist the state down into components that use the
 * `connect` higher order component.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Endpoints />
        <Errors />
      </Provider>
    );
  }
}

export default App;
