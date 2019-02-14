import * as endpointsService from '../../services/endpoints';

export const ENDPOINTS_REQUEST = 'ENDPOINTS_REQUEST';
export const ENDPOINTS_REQUEST_FAILED = 'ENDPOINTS_REQUEST_FAILED';
export const ENDPOINTS_REQUEST_SUCCEEDED = 'ENDPOINTS_REQUEST_SUCCEEDED';

/**
 * Creates an action that is used when a request for
 * endpoints starts
 */
export const startEndpointsRequest = () => {
  return {
    type: ENDPOINTS_REQUEST
  };
}

/**
 * Creates an action that is used when a request for
 * endpoints fails
 * @param {string} err An error message
 */
export const failEndpointsRequest = (err) => {
  return {
    type: ENDPOINTS_REQUEST_FAILED,
    error: err
  };
}

/**
 * Creates an action that is used when a request for
 * endpoints returns successfully with a list
 * @param {any[]} endpoints A list of endpoints
 */
export const completeEndpointsRequest = (endpoints) => {
  return {
    type: ENDPOINTS_REQUEST_SUCCEEDED,
    endpoints
  };
};

/**
 * The technical term that redux calls these are "async actions".
 * Others call these effects, because they are kind of like
 * side-effects that impact your application.
 * It is a function, like our normal action creators, but
 * instead of returning an object with { type: <something> },
 * we are returning a function!
 * https://redux.js.org/advanced/async-actions#async-action-creators
 * 
 * This is possible because we added the `redux-thunk`
 * middleware when we configured the store. See `../index.js`
 * for more on that.
 */
export const requestEndpoints = () => dispatch => {
  // When the requestEndpoints function is called, it returns
  // a function that passes in `dispatch` as an argument. The
  // dispatch lets us emit actions to the store for the reducers
  // to handle.

  // To start out, because this effect/async action/whatever is
  // for requesting a list of endpoints, we want to notify the
  // store that we have started the request
  dispatch(startEndpointsRequest());

  // Next, we call our API. It can be useful to split the API
  // calls out into their own "service" files so you know that
  // those files are strictly for making requests
  // NOTE: If you want the service to error, pass in `true`
  // as an argument. If you want it to succeed, pass in nothing.
  endpointsService.getEndpoints()
    .then(endpoints => {
      // If the request comes back successfully, then we dispatch
      // an action to let the store know we are done, and we pass
      // in the endpoints we get back from the request
      dispatch(completeEndpointsRequest(endpoints));
    })
    .catch(err => {
      // If the request fails for some reason, then we dispatch
      // an action to let the store know of the error, passing
      // in the error to the action
      dispatch(failEndpointsRequest(err));
    });
};
