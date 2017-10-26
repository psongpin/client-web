// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/projects';
import internshipServices from '@client/services/internships';
import { statusTypes } from '@client/models/Internship';
import { locationPush } from '../router';

class ProjectActions extends Actions {
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/projects/${id}`));
  goToEdit = (id: $$id) => dispatch =>
    dispatch(locationPush(`/projects/${id}/edit`));
  getInternships = (id: $$id) => dispatch => {
    return internshipServices
      .getByProject(id, [statusTypes.PREACTIVE, statusTypes.ACTIVE])
      .then(internships => {
        return dispatch(
          this.entities.getRelated(id, 'internships', internships)
        );
      });
  };
  getPastInternships = (id: $$id) => dispatch => {
    return internshipServices
      .getByProject(id, [statusTypes.INACTIVE])
      .then(internships => {
        return dispatch(
          this.entities.getRelated(id, 'pastInternships', internships)
        );
      });
  };
}

export default new ProjectActions(schemaConstants.projects, services);
