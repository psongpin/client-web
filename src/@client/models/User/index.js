// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  username: 'Username',
  points: 0,
  imageUrl: '',
  linkedInUrl: '',
};
export default class User extends Record(properties) {

}

