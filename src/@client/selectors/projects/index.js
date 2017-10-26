// @flow
import Selector from '@client/utils/selectorUtils';
import Project from '@client/models/Project';
import { get } from 'lodash';

const { projects } = require('@client/schemas/constants');

class ProjectSelectors extends Selector {
  getIdFromLocation = (state, props) => get(props, 'params.projectId');
}

export default new ProjectSelectors(projects, new Project());
