// @flow
import Selector from '@client/utils/selectorUtils';
import Project from '@client/models/Project';
import { createSelector } from 'reselect';
import { get } from 'lodash';

import sessionSelectors from '../pages/sessions';

const { projects } = require('@client/schemas/constants');
const defaultIdSelector = (state, props) => props.id;
class ProjectSelectors extends Selector {
  getIdFromLocation = (state, props) => get(props, 'params.projectId');
  currentUserOwnsProject = (idSelector?: Function = defaultIdSelector) => createSelector(
    [
      this.findRelatedId('user', idSelector),
      sessionSelectors.getCurrentUserId(),
    ],
    (projectUserId, currentUserId) => projectUserId === currentUserId
  );
}

export default new ProjectSelectors(projects, new Project());
