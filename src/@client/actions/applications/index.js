// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/applications';

import { locationPush } from '../router';

class ApplicationActions extends Actions {
  goToApplicants = (id: $$id) => dispatch => dispatch(locationPush(`/applicants/${id}`))
}

export default new ApplicationActions(schemaConstants.applications);
