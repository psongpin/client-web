// @flow
import prefetch from 'isomorphic-fetch';
import * as storage from '../localStorageUtils';

export { prefetch };

export const getDefaultOptions = (method: string) => ({
  method,
  headers: {
    Authorization: storage.get('token'),
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  cache: 'default',
});
