import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RequestStatuses } from '../constants/api';

/**
 * A component that displays a list of endpoints
 *
 * This could be called a "presentational" or "dumb"
 * component, since it knows nothing about redux.
 */
class Endpoints extends Component {
  componentDidMount() {
    // When the component mounts, we want to grab the
    // endpoint data we need
    this.props.requestEndpoints();
  }

  render() {
    const { endpoints, requestStatus } = this.props;
    if (requestStatus === RequestStatuses.Pending) {
      // If a request has been made that is still pending,
      // simply show a loader
      return 'Loading...';
    } else if (requestStatus === RequestStatuses.Failed) {
      // If we got a request back that failed, give the
      // user the option to try again
      // NOTE: This is probably not something you'd actually
      // want to do, but it is here as an example of being
      // able to call a function that (from the index.jsx
      // file's mapDispatchToProps) will start some process
      // to try the request
      return (
        <div>
          Uh oh, something went wrong :(
          <br />
          <button type="button" onClick={this.onTryAgainClick}>Try Again</button>
        </div>
      );
    }

    // If we got this far, then we probably have endpoints.
    // Let's go ahead and simply render the list
    return (
      <ul>
        {
          endpoints.map(endpoint => {
            return (
              <li key={endpoint.id}>{endpoint.name}</li>
            );
          })
        }
      </ul>
    );
  }

  onTryAgainClick = () => {
    // When a user clicks the button, we can simply call
    // some prop to request endpoints again. This component
    // has no clue what this function does; all it needs to
    // know is that it is a function to request endpoints.
    // The real magic for this function is handled in the
    // connected component in `./index.jsx` in the
    // `mapDispatchToProps` function
    this.props.requestEndpoints();
  }
};

// Define the types of props we are expecting.
// This is a dev-only thing; these checks don't
// actually do anything in production. That is
// on purpose by react to keep it as efficient
// as possible, and really, you should have tested
// the props passed in during dev anyway :)
// https://reactjs.org/docs/typechecking-with-proptypes.html
Endpoints.propTypes = {
  endpoints: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  requestEndpoints: PropTypes.func.isRequired,
  requestStatus: PropTypes.number
};

export default Endpoints;
