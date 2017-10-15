// @flow
import { createSelector } from 'reselect';
import { parse } from 'qs';
import { get } from 'lodash';
import { camelizeKeys } from 'humps';

export const getPathName = (state: Object) => state.routing.locationBeforeTransitions.pathname;

export const splitPathName = createSelector(
  [
    getPathName,
  ],
  (pathName: string) => pathName.split('/'),
);

export const parameterizeURL = createSelector(
  [
    splitPathName,
  ],
	(pathName: string[]) => pathName.reduce((ids, partialPath) => {
  if (partialPath && !isNaN(partialPath)) {
    ids.push(partialPath);
  }
  return ids;
}, []),
);

export const getIdParam = (i: number) => createSelector(
  [
    parameterizeURL,
  ],
		ids => ids[i],
	);

export const getQueryObject = createSelector(
  [
    state => get(state, 'routing.locationBeforeTransitions.search'),
  ],
  (query) => (query ? parse((query).slice(1)) : {}),
);

export const getFlash = createSelector(
  [
    getQueryObject,
  ],
  (query)=>(query.flash || {}),
)

export const getPathname = createSelector(
  [
    state => get(state, 'routing.locationBeforeTransitions.pathname'),
  ],
  (pathname) => pathname,
);

export const getQuery = (suffix?: string = '') => createSelector(
  [
    state => get(state, 'routing.locationBeforeTransitions.query'),
  ],
  (query)=>(suffix ? get(camelizeKeys(query), suffix) : camelizeKeys(query)),
);
