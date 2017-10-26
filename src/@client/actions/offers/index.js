// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/offers';
import { batchActions } from 'redux-batched-actions';
import Application from '@client/models/Application';
import applicationActions from '../applications';

class OfferActions extends Actions {
  // $FlowFixMe
  create = (offer: Object) => dispatch => {
    return services.create(offer).then(id => {
      return dispatch(
        batchActions([
          this.createRelated(
            {
              ...offer,
              id,
            },
            {
              name: 'offer',
              entityName: schemaConstants.applications,
              id: offer.applicationId,
            }
          ),
          applicationActions.entities.update({
            id: offer.applicationId,
            status: Application.statusTypes.OFFERED,
          }),
        ])
      );
    });
  };
  accept = (id: $$id, applicationId: $$id) => dispatch => {
    return services.accept(id).then(() => {
      return dispatch(
        applicationActions.entities.update({
          id: applicationId,
          status: Application.statusTypes.OFFER_ACCEPTED,
        })
      );
    });
  };
  reject = (id: $$id, applicationId: $$id) => dispatch => {
    return services.accept(id).then(() => {
      return dispatch(
        applicationActions.entities.update({
          id: applicationId,
          status: Application.statusTypes.OFFER_REJECTED,
        })
      );
    });
  };
}

export default new OfferActions(schemaConstants.offers, services);
