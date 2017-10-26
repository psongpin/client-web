// @flow
import { push, replace } from 'react-router-redux';
import { decamelizeKeys } from 'humps';
import qs from 'qs';

export const getRouterState = (state: Object) =>
  state.routing.locationBeforeTransitions;

export const getPathname = (state: Object) => getRouterState(state).pathname;
export const getQuery = (state: Object) => getRouterState(state).query;
export const getSearch = (state: Object) => getRouterState(state).search;

export function queryPush(nextQuery: Object) {
  return (dispatch: Function, getState: Function) => {
    const { query, pathname } = getRouterState(getState());
    dispatch(
      push({
        pathname,
        query: { ...query, ...nextQuery },
      })
    );
  };
}

export function queryReplace(nextQuery: Object) {
  return (dispatch: Function, getState: Function) => {
    const { query, pathname } = getRouterState(getState());
    dispatch(
      replace({
        pathname,
        query: { ...query, ...decamelizeKeys(nextQuery) },
      })
    );
  };
}

export const removeQuery = (queryObject: Object) => (
  dispatch: Function,
  getState: Function
) => {
  const pathname = getPathname(getState());
  const search = getSearch(getState());
  const finalLocation = `${pathname}${search.replace(
    qs.stringify(queryObject),
    ''
  )}`;
  return dispatch(push(finalLocation));
};

export function locationPush(nextLocation: string) {
  return (dispatch: Function, getState: Function) => {
    const { query } = getRouterState(getState());
    dispatch(
      push({
        query,
        pathname: nextLocation,
      })
    );
  };
}

export function openPanel(panelLocation: string, options?: Object = {}) {
  const panelOptions = Object.keys(options).reduce((finalResult, key) => {
    finalResult[`panel[${key}]`] = options[key];
    return finalResult;
  }, {});
  return queryPush({
    'panel[open]': true,
    'panel[location]': panelLocation,
    ...panelOptions,
  });
}

export function closePanel() {
  return queryPush({
    'panel[open]': '',
  });
}

export { push };
