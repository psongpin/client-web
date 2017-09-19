// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  email: '',
  username: '',
  points: 0,
};
export default class User extends Record(properties) {

}

