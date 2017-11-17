// @flow
import { Services } from '@client/utils/serviceUtils';

class PointServices extends Services {
  getByInternships = (ids) => this.post('by_internships', { ids });
}

export default new PointServices('points');
