// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: 'Internship Name',
  description: 'Internship Description',
  status: 1,
};

export const statusTypes = {
  ACTIVE: 1,
  INACTIVE: 2,
  PREACTIVE: 3,
};

export default class Internship extends Record(properties) {

}
