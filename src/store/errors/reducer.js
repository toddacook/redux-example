import * as actions from './actions';
import * as endpointActions from '../endpoints/actions';

// Set the initial state for this piece of the
// application's state
// https://redux.js.org/recipes/structuring-reducers/basic-reducer-structure#basic-state-shape
//
// All we need to track errors in this example
// is just an array of strings
const initialState = [];


// NOTE: Don't do this! Reducers should be pure logic, so
// the same state/action combo should always result in the
// same result. This indexer is used to pretend that the
// errors have some sort of unique code that we can track
// for when we clear them
let mockIndexer = 0;


/**
 * The reducer for the piece of state that handles errors.
 *
 * This reducer tracks errors across the entire application,
 * as well as actions that clear the errors
 * @param {string[]} state The state
 * @param {any} action An action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ERROR_CLEAR: {
      // When we get this action, clear out the error
      // that is found at the index provided by the action
      const index = state.findIndex(err => err.index === action.index);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case endpointActions.ENDPOINTS_REQUEST_FAILED: {
      // When we get this action, add the error message
      // to the list of errors.
      //
      // Note that this action was defined as an endpoint
      // action, but we are still doing something with it
      // here in the errors reducer!
      // That is because _every_ action goes through _every_
      // reducer; it is up to the reducer to decide whether
      // they want to do anything with it or not
      return [
        ...state,
        { index: ++mockIndexer, message: action.error }
      ];
    }
    default: {
      // For every action that is not listed in the switch-
      // case, simply return whatever state we already had
      return state;
    }
  }
};

export default reducer;
