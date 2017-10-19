// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  username: 'Username',
  description: '',
  points: 0,
  imageUrl: '',
};
export default class User extends Record(properties) {

}

