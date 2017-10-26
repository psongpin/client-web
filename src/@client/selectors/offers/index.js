// @flow
import Selector from '@client/utils/selectorUtils';
import Offer from '@client/models/Offer';

const schemaConstants = require('@client/schemas/constants');

class OfferSelectors extends Selector {}

export default new OfferSelectors(schemaConstants.offers, new Offer());
