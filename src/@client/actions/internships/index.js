// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/internships';
import { locationPush } from '../router';

class InternshipActions extends Actions {
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/internships/${id}`))
  goToEdit = (id: $$id) => dispatch => dispatch(locationPush(`/internships/${id}/edit`))
}

export default new InternshipActions(schemaConstants.internships, services);
