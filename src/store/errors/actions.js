export const ERROR_CLEAR = 'ERROR_CLEAR';

/**
 * Creates an action to clears an error once a
 * user dismisses the error
 * @param {number} index An index of an error message to clear
 */
export const clearError = index => {
  return {
    type: ERROR_CLEAR,
    index
  };
}
