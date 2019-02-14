import { connect } from 'react-redux';

// Pull in the action creators we will need
import { clearError } from '../store/errors/actions';

// Pull in the actual component we want to display
import Errors from './Errors';

/**
 * A function that takes in the state of the application
 * and returns an object. This object is merged with the
 * props that are passed into the component
 * @param {any} state The state of the application
 */
const mapStateToProps = state => {
  // This simply pulls the piece of state called "errors"
  // out and pushes it into our connected component by
  // a prop called "errors"
  // We _could_ use a selector here for super effiency,
  // but for simplicity I am not. For more on selectors,
  // see `/Endpoints/index.jsx` where we use them, or see
  // `/store/endpoints/selectors.js` where they are defined
  return {
    errors: state.errors
  };
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
    clearError: index => dispatch(clearError(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
