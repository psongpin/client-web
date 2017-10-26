// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/internships';
import applicationServices from '@client/services/applications';
import internServices from '@client/services/interns';
import { statusTypes } from '@client/models/Intern';
import { locationPush } from '../router';

class InternshipActions extends Actions {
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/internships/${id}`));
  goToEdit = (id: $$id) => dispatch =>
    dispatch(locationPush(`/internships/${id}/edit`));
  getApplications = (id: $$id) => dispatch => {
    return applicationServices.byInternship(id).then(applications => {
      return dispatch(
        this.entities.getRelated(id, 'applications', applications)
      );
    });
  };
  getInterns = (id: $$id) => dispatch => {
    if (!id) {
      return Promise.resolve([]);
    }
    return internServices
      .byInternship(id, [statusTypes.ACTIVE, statusTypes.AWAITING_APPROVAL])
      .then(interns => {
        dispatch(this.entities.getRelated(id, 'interns', interns));
        return interns;
      });
  };
  getFinishedInterns = (id: $$id) => dispatch => {
    if (!id) {
      return Promise.resolve([]);
    }
    return internServices
      .byInternship(id, [
        statusTypes.FIRED,
        statusTypes.COMPLETED,
        statusTypes.WILL_NOT_COMPLETE,
      ])
      .then(interns => {
        dispatch(this.entities.getRelated(id, 'finishedInterns', interns));
        return interns;
      });
  };
}

export default new InternshipActions(schemaConstants.internships, services);
