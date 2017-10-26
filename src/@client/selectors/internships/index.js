// @flow
import { get } from 'lodash';
import { createSelector } from 'reselect';
import Selector from '@client/utils/selectorUtils';
import Internship from '@client/models/Internship';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';

const defaultIdSelector = (state, props) => props.id;

const { internships } = require('@client/schemas/constants');

class InternshipSelectors extends Selector {
  getIdFromLocation = (state, props) => get(props, 'params.internshipId');
  getProjectId = internshipIdSelector => {
    return this.findRelatedId(
      'project',
      internshipIdSelector || defaultIdSelector
    );
  };
  getUserId = internshipIdSelector =>
    projectSelectors.findRelatedId(
      'user',
      this.getProjectId(internshipIdSelector)
    );
  canEdit = internshipIdSelector =>
    createSelector(
      [
        this.getUserId(internshipIdSelector),
        sessionSelectors.getCurrentUserId(),
      ],
      (userId, currentUserId) => {
        return Number(userId) === Number(currentUserId);
      }
    );
  internExists = internshipIdSelector =>
    createSelector(
      [
        this.getRelatedIds('interns', internshipIdSelector),
        this.getRelatedIds('finishedInterns', internshipIdSelector),
      ],
      (interns, finishedInterns) => {
        return interns.size + finishedInterns.size > 0;
      }
    );
}

export default new InternshipSelectors(internships, new Internship());
