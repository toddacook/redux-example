import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A component that displays a list of errors
 *
 * This could be called a "presentational" or "dumb"
 * component, since it knows nothing about redux.
 */
class Errors extends Component {
  render() {
    const { errors } = this.props;
    if (errors && errors.length) {
      return (
        <div>
          <h3>Errors</h3>
          <ul>
            {
              errors.map(err => {
                return (
                  <li key={err.index}>
                    {err.index} - {err.message}
                    <span style={{marginLeft: '8px', cursor: 'pointer'}} data-index={err.index} onClick={this.onClick}>X</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      );
    }

    return null;
  }

  onClick = e => {
    // Whenever a user clicks on the X next to the error, we
    // simply call the `clearError` function that was passed
    // in via props.
    //
    // This function is _actually_ passed in
    // from the `./index.jsx` file's `mapDispatchToProps`
    // implementation, but this component doesn't actually
    // need to know where it came from or what it does, just
    // that it is something to call
    const { index } = e.target.dataset;
    this.props.clearError(+index);
  }
}

// Define the types of props we are expecting.
// This is a dev-only thing; these checks don't
// actually do anything in production. That is
// on purpose by react to keep it as efficient
// as possible, and really, you should have tested
// the props passed in during dev anyway :)
// https://reactjs.org/docs/typechecking-with-proptypes.html
Errors.propTypes = {
  clearError: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
  }))
};

export default Errors;
