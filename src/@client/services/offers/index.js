// @flow
import { Services } from '@client/utils/serviceUtils';

class OfferServices extends Services {
  byApplication = (id: $$id) => this.get(`by_application/${id}`);
  accept = (id: $$id) => this.update(`${id}/accept`, {});
  reject = (id: $$id) => this.update(`${id}/reject`, {});
}

export default new OfferServices('offers');
