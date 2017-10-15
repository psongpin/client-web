// @flow
import { Services } from '@client/utils/serviceUtils';

class OfferServices extends Services {
  create = ()=>{
    return Promise.resolve(3);
  }
}

export default new OfferServices('offers');
