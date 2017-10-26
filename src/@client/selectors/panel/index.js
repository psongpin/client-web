// @flow
import { createSelector } from 'reselect';
import { get } from 'lodash';
import { getQueryObject } from '../router';

export const getPanel = (prop?: string) =>
  createSelector(
    [getQueryObject],
    query => (prop ? get(query, `panel.${prop}`) : query.panel || {})
  );

export const isPanelActive = getPanel('open');
