// @flow
import { Services } from '@client/utils/serviceUtils';

class InternshipServices extends Services {
  getByProject = (id, status) => this.post(`by_project/${id}`, { status });
  byUser = id => this.get(`by_user/${id}`);
}

export default new InternshipServices('internships');
