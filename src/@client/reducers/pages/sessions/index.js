// @flow
import { set, remove } from '@client/utils/localStorageUtils';

const { sessions } = require('@client/schemas/pages/constants');

export const LOGOUT = (state: any) => {
  remove('token');
  return state.updateIn([sessions], (ent) => {
    if (!ent) {
      return ent;
    }
    return ent.set('token', '');
  });
};

export const LOGIN = (state: any, { payload: token }: Object) => {
  set('token', token);
  return state.setIn([sessions, 'token'], token);
};
