// @flow
import { Services } from '@client/utils/serviceUtils';

class ApplicationServices extends Services {
  byInternship = (id: $$id) => this.post(`by_internship/${id}`, {});
}

export default new ApplicationServices('applications');
