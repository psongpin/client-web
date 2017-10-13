// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: 'Internship Name',
  description: 'Internship Description',
};
export default class Internship extends Record(properties) {

}

