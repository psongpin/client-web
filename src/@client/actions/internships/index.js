// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/internships';
import applicationServices from '@client/services/applications';
import { locationPush } from '../router';

class InternshipActions extends Actions {
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/internships/${id}`))
  goToEdit = (id: $$id) => dispatch => dispatch(locationPush(`/internships/${id}/edit`))
  getApplications = (id: $$id) => dispatch => {
    return applicationServices.byInternship(id)
    .then(applications => {
      dispatch(this.entities.getRelated(id, 'applications', applications));
    });
  }
}

export default new InternshipActions(schemaConstants.internships, services);
