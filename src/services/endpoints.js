/**
 * A function to pretends to call an API. Since the
 * `fetch` protocol uses a `Promise`-like syntax, we
 * can mock it using a `Promise`.
 * @param {boolean} pretendThereIsAnError If you set this to true, the function will throw an error
 */
const getEndpoints = (pretendThereIsAnError) => {
  // Mock a fetch request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pretendThereIsAnError) {
        reject('Error because there is no API to hit');
      } else {
        resolve([
          { id: 'endpoint-1', name: 'Endpoint 1' },
          { id: 'endpoint-2', name: 'Endpoint 2' },
          { id: 'endpoint-3', name: 'Endpoint 3' }
        ]);
      }
    }, 1000);
  });
};

export {
  getEndpoints
};
