// @flow
import { Record } from 'immutable';

export const properties = {
  id: 0,
  name: 'Project Title',
};
export default class Project extends Record(properties) {

}

