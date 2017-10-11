// @flow
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/projects';
import { locationPush } from '../router';

class ProjectActions extends Actions {
  get = (id: $$id) => dispatch => services.get(id).then((project)=>{
    dispatch(this.entities.get(project));
  })
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/projects/${id}`))
}

export default new ProjectActions(schemaConstants.projects, services);
