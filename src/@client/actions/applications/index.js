// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/applications';
import offerServices from '@client/services/offers';
import { batchActions } from 'redux-batched-actions';

import { locationPush } from '../router';

class ApplicationActions extends Actions {
  goToApplicants = (id: $$id) => dispatch =>
    dispatch(locationPush(`/applicants/${id}`));
  create = (application: Object, userId: $$id) => dispatch => {
    return services.create(application).then(id => {
      dispatch(
        batchActions([
          this.createRelated(
            { ...application, id },
            {
              entityName: 'internships',
              name: 'applications',
              id: application.internshipId,
            }
          ),
          this.relationships.link({
            relationshipName: 'user',
            id,
            relationshipValue: userId,
          }),
        ])
      );
    });
  };
  getOffer = (id: $$id) => dispatch => {
    return offerServices.byApplication(id).then(offer => {
      return dispatch(this.entities.getRelated(id, 'offer', offer));
    });
  };
}

export default new ApplicationActions(schemaConstants.applications);
