// @flow
import { Services } from '@client/utils/serviceUtils';

class InternshipServices extends Services {
  getByProject = (id)=>this.get(`by_project/${id}`)
}

export default new InternshipServices('internships');
