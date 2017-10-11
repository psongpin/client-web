// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/projects';
import internshipServices from '@client/services/internships';
import { locationPush } from '../router';



class ProjectActions extends Actions {
  get = (id: $$id) => dispatch => services.get(id).then((project)=>{
    dispatch(this.entities.get(project));
  })
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/projects/${id}`))
  getInternships = (id: $$id)=> dispatch => {
    return internshipServices.getByProject(id)
      .then((internships)=>{
        return dispatch(this.entities.getRelated(id, schemaConstants.internships, internships));
      });
  }
}

export default new ProjectActions(schemaConstants.projects, services);
