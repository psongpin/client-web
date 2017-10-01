// @flow
import Selector from '@client/utils/selectorUtils';
import Project from '@client/models/Project';

const { projects } = require('@client/schemas/constants');

class ProjectSelectors extends Selector {
}

export default new ProjectSelectors(projects, new Project());
