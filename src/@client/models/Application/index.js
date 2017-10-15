// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  status: 1,
};

export const statusTypes = {
  OFFERED: 2,
};

export const displayStatusTypes = {
  [1]: 'Pending',
  [2]: 'Offered',
  [3]: 'Rejected',
};

export const displayStatus = (applicant: Object)=>{
  return displayStatusTypes[applicant.status];
};

export default class Application extends Record(properties) {
  static statusTypes = statusTypes
  static displayStatusTypes = displayStatusTypes
}

