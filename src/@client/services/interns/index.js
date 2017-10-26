// @flow
import { Services } from '@client/utils/serviceUtils';

class InternServices extends Services {
  byInternship = (id: $$id, status) =>
    this.post(`by_internship/${id}`, { status });
  byUser = (id: $$id) => this.get(`by_user/${id}`);
  changeStatus = (id: $$id, status: number) =>
    this.update(`${id}/status`, { status });
  logMinutes = (id: $$id, minutes: number) =>
    this.update(`${id}/minutes`, { minutes });
}

export default new InternServices('interns');
