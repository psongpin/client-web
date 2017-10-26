// @flow
import { Services } from '@client/utils/serviceUtils';

class ProjectServices extends Services {
  byUser = (id: $$id) => this.get(`by_user/${id}`);
}

export default new ProjectServices('projects');
