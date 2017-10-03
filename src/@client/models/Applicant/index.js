// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  status: 'Pending',
};
export default class Applicant extends Record(properties) {

}

