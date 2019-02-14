import * as actions from './actions';

import { RequestStatuses } from '../../constants/api';

// Set the initial state for this piece of the
// application's state
// https://redux.js.org/recipes/structuring-reducers/basic-reducer-structure#basic-state-shape
//
// This piece of state tracks the endpoints. It
// is set up to track the endpoints in a normalized
// manner, which can give us some benefits
// https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
const initialState = {
  endpointIds: [],
  endpointsById: {},
  requestStatus: RequestStatuses.None
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ENDPOINTS_REQUEST: {
      // When we get this action, simply flip the status
      // to pending while we wait for the request. This
      // is actually dispatched from `./effects.js`, which
      // handles some asynchronous actions for us
      return {
        ...state,
        requestStatus: RequestStatuses.Pending
      };
    }
    case actions.ENDPOINTS_REQUEST_FAILED: {
      // When we get this action, something must've gone
      // wrong with a request. We want to set the status
      // to `Failed`, and we may also want to clear out
      // the existing data we had
      return {
        ...state,
        endpointIds: initialState.endpointIds,
        endpointsById: initialState.endpointsById,
        requestStatus: RequestStatuses.Failed
      };
    }
    case actions.ENDPOINTS_REQUEST_SUCCEEDED: {
      // When we get this action, the request went through
      // successfully! We want to set the status of the
      // request to `Succeeded`, and we then want to break
      // the data down into a normalized structure.
      // See the comments where initialState is declared
      // for more information on this
      const { endpoints } = action;
      return {
        ...state,
        endpointIds: endpoints.map(endpoint => endpoint.id),
        endpointsById: endpoints.reduce((obj, endpoint) => {
          return {
            ...obj,
            [endpoint.id]: endpoint
          };
        }, {}),
        requestStatus: RequestStatuses.Succeeded
      };
    }
    default: {
      // For every action that is not listed in the switch-
      // case, simply return whatever state we already had
      return state;
    }
  }
};

export default reducer;
