// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/internships';
import { locationPush } from '../router';

const { internships: INTERNSHIPS } = schemaConstants;

class InternshipActions extends Actions {
  get = (id: $$id) => dispatch => services.get(id).then((internship)=>{
    dispatch(this.entities.get(internship));
  })
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/internships/${id}`))
}

export default new InternshipActions(INTERNSHIPS);
