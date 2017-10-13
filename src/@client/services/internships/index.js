// @flow
import { Services } from '@client/utils/serviceUtils';

class InternshipServices extends Services {
  getByProject = (id)=>this.get(`by_project/${id}`)
  byUser = (id)=>this.get(`by_user/${id}`)
}

export default new InternshipServices('internships');
