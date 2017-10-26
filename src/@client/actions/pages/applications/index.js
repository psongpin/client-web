// @flow
import { PageActions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/pages/constants';
import services from '@client/services/applications';
import * as routerActions from '../../router';

class ApplicationActions extends PageActions {
  getApplications = () => dispatch => {
    return services.index().then(applications => {
      return dispatch(this.entities.getRelated('applications', applications));
    });
  };
  goTo = () => dispatch => {
    return dispatch(routerActions.locationPush('/applications'));
  };
}

export default new ApplicationActions(schemaConstants.applications);
