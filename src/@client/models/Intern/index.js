// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  minutes: 0,
  status: 0,
};

export const statusTypes = {
  ACTIVE: 1,
  AWAITING_APPROVAL: 2,
  FIRED: 3,
  COMPLETED: 4,
  WILL_NOT_COMPLETE: 5,
};

export const displayStatusTypes = {
  [1]: 'Active',
  [2]: 'Awaiting Approval',
  [3]: 'Fired',
  [4]: 'Completed',
  [5]: 'Will Not Complete',
};

export default class Intern extends Record(properties) {}

export const finished = (intern: Intern) =>
  !(
    intern.status === statusTypes.ACTIVE ||
    intern.status === statusTypes.AWAITING_APPROVAL
  );
