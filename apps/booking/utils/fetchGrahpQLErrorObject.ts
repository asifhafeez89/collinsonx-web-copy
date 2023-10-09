// @ts-ignore
function fetchGrahpQLErrorObject(response, key: string) {
  if (!response && typeof response !== 'object') {
    return null;
  }

  if (!response[key]) {
    return null;
  }

  const error = response[key];

  if (error && 'graphQLErrors' in error) {
    const graphQLErrors = error.graphQLErrors;

    if (graphQLErrors && typeof graphQLErrors === 'object') {
      const data = error.graphQLErrors[0];
      if ('extensions' in data) {
        return data.extensions;
      }
    }
  }

  return null;
}

export default fetchGrahpQLErrorObject;
