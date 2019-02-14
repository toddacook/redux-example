import { createSelector } from 'reselect';

/**
 * This function simply returns the piece of state
 * for the endpoints that stores an array of ids
 * @param {any} state The application state
 */
const getEndpointIds = state => state.endpoints.endpointIds;

/**
 * This function simply returns the piece of state
 * for the endpoints that stores a set of key/value
 * pairs of endpoints by id
 * @param {any} state The application state
 */
const getEndpointsById = state => state.endpoints.endpointsById;

/**
 * This function simply returns the piece of state
 * for the endpoints that stores the status of a request
 * @param {any} state The application state
 */
const getRequestStatus = state => state.endpoints.requestStatus;

/**
 * This creates a selector. A selector is *NOT* a part of
 * redux; rather, it is a layer on top of it. Selectors
 * are optional (Nebula doesn't use them, although we
 * should and I recommend them) because you can always
 * query the state data in the `connect` higher order
 * component.
 *
 * Selectors are a way to optimize the "queries" to get
 * the state. They can (for lack of a better term) cache
 * the queries for state, as well as let you compose
 * queries to output data in whatever manner you need
 * https://github.com/reduxjs/reselect
 *
 * For this selector, in a `mapStateToProps` function,
 * we would simply refer to the selector, wrather than
 * select the state ourselves. An example of this is in
 * the `/Endpoints/index.jsx` container component. This
 * selector simply denormalizes the state and returns
 * us a list of endpoints as an array
 */
const getEndpoints = createSelector(
  [getEndpointIds, getEndpointsById],
  (endpointIds, endpointsById) => endpointIds.map(id => endpointsById[id])
);

export {
  getEndpoints,
  getRequestStatus as getEndpointsRequestStatus
};
