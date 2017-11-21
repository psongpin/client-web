// @flow
import { Record } from 'immutable';

export const statusTypes = {
  ACTIVE: 1,
  INACTIVE: 2,
  PREACTIVE: 3,
};

export const statusLabels = {
  [1]: 'Active',
  [2]: 'Inactive',
};

export const properties = {
  id: 0,
  name: 'Internship Name',
  description: `### Description
  You'll be working...
  ### Responsibilities
  Creating test driven react comp...
  ### Qualifications
  * computer programming degree, certificate, diploma, or experience...
  ### Desired Skills
  * Webpack 3.0 ...
  `,
  status: statusTypes.ACTIVE,
  points: 0,
  location: '',
  remote: true,
};

export default class Internship extends Record(properties) {}
