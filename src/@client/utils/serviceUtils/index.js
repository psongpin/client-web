// @flow
import prefetch from 'isomorphic-fetch';
import merge from 'deepmerge';

import store from '../../../configureStore';
import * as storage from '../localStorageUtils';

const fetch = function fetch(url, options) {
  return prefetch(url, options).then(resp => {
    if (resp.status >= 400) {
      if (resp.status === 401) {
        store.dispatch({
          type: 'LOGOUT',
        });
      }
      throw new Error('Bad response from server');
    }
    if (resp.headers.get('authorization')) {
      store.dispatch({
        type: 'LOGIN',
        payload: resp.headers.get('authorization'),
      });
    }
    return resp
      .json()
      .then(jsonResp => {
        if (jsonResp.data !== undefined) {
          return jsonResp.data;
        }
        return jsonResp;
      })
      .catch(() => null);
  });
};

const getDefaultOptions = method => ({
  method,
  headers: {
    Authorization: storage.get('token'),
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  cache: 'default',
});

export const get = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('GET')));
export const put = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('PUT')));
export const patch = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('PATCH')));
export const post = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('POST')));
export const del = (url: string, options: Object = {}) =>
  fetch(url, merge(options, getDefaultOptions('DELETE')));

type $url = string | number;

function processUrl(url) {
  if (!url) {
    return '';
  }
  return `/${url}`;
}

export class Services {
  prefix: string;
  host: string;
  constructor(prefix: string, host?: string) {
    this.prefix = prefix;
    this.host = `${host ||
      process.env.API_CONNECTION ||
      'https://api.menternship.org'}/`;
  }
  _getUrl(prefix: string, url?: $url) {
    return `${this.host}${prefix}${processUrl(url)}`;
  }
  get = (url: $url, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return get(this._getUrl(prefix || this.prefix, url), finalOptions);
  };
  update = (url: $url, body: any = {}, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return patch(this._getUrl(prefix || this.prefix, url), {
      ...finalOptions,
      body: JSON.stringify(body),
    });
  };
  index = (url?: $url, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return get(this._getUrl(prefix || this.prefix, url), finalOptions);
  };
  del = (url?: $url, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return del(this._getUrl(prefix || this.prefix, url), finalOptions);
  };
  create = (body: Object, options?: Object = {}) => {
    const { prefix, url, ...finalOptions } = options;
    return post(this._getUrl(prefix || this.prefix, url), {
      ...finalOptions,
      body: JSON.stringify(body),
    });
  };
  post = (url: string, body: Object, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return post(this._getUrl(prefix || this.prefix, url), {
      ...finalOptions,
      body: JSON.stringify(body),
    });
  };
  search = (searchText: string, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return post(this._getUrl(prefix || this.prefix, 'search'), {
      ...finalOptions,
      body: JSON.stringify({ searchText }),
    });
  };
  put = (url: string, body: Object, options?: Object = {}) => {
    const { prefix, ...finalOptions } = options;
    return put(this._getUrl(prefix || this.prefix, url), {
      ...finalOptions,
      body: JSON.stringify(body),
    });
  };
}
