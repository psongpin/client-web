// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/applicants';
import { locationPush } from '../router';

class ApplicantActions extends Actions {
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/applicants/${id}`))
}

export default new ApplicantActions(schemaConstants.applicants, services);
