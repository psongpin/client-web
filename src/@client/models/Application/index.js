// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  status: 1,
};

export const statusTypes = {
  PENDING: 1,
  OFFERED: 2,
  REJECTED: 3,
  OFFER_REJECTED: 4,
  OFFER_ACCEPTED: 5,
};

export const displayStatusTypes = {
  [1]: 'Pending',
  [2]: 'Offered',
  [3]: 'Rejected',
  [4]: 'Offer Rejected',
  [5]: 'Offer Accepted',
};

export const displayStatus = (application: Object)=>{
  return displayStatusTypes[application.status];
};

export const isPending = (application: Object)=>application.status === statusTypes.PENDING;

export default class Application extends Record(properties) {
  static statusTypes = statusTypes
  static displayStatusTypes = displayStatusTypes
}

