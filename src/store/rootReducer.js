import { combineReducers } from 'redux';

import endpoints from './endpoints/reducer';
import errors from './errors/reducer';

// This is the root of all reducers. It composes the
// reducers in the application to build up the state.
//
// Right now, it would produce a state object that looks
// something like:
// {
//    endpoints: { ... },
//    errors: { ... }
// }
// https://redux.js.org/recipes/structuring-reducers/using-combinereducers
export default combineReducers({
  endpoints,
  errors
});
