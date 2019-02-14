import { connect } from 'react-redux';

// Pull in the action creators we will need
import { requestEndpoints } from '../store/endpoints/actions';

// Pull in the selectors we will use to get stuff
// out of the state
import { getEndpoints, getEndpointsRequestStatus } from '../store/endpoints/selectors';

// Pull in the actual component we want to display
import Endpoints from './Endpoints';

/**
 * A function that takes in the state of the application
 * and returns an object. This object is merged with the
 * props that are passed into the component
 * @param {any} state The state of the application
 */
const mapStateToProps = state => {
  // This pulls in two pieces of state, a list of endpoints
  // and the status of a request to get the list.
  // These use selectors to efficiently grab the items from
  // the state; the selectors know how to correctly get the
  // stuff we want, minimizing the responsibility of this
  // function
  return {
    endpoints: getEndpoints(state),
    requestStatus: getEndpointsRequestStatus(state)
  }
};

/**
 * A function that takes in the dispatch function for
 * the redux store, and lets us define an object that
 * will be merged with the props passed into the
 * component.
 *
 * This lets the wrapped component only have to know
 * about functions to call, and in no way does it have
 * to know anything about redux.
 * @param {(action: any) => void} dispatch A function to dispatch actions to the store
 */
const mapDispatchToProps = dispatch => {
  return {
    requestEndpoints: () => dispatch(requestEndpoints())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Endpoints);
