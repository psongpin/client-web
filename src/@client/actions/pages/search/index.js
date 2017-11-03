// @flow
import { PageActions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/pages/constants';
import userServices from '@client/services/users';
import internshipServices from '@client/services/internships';
import projectServices from '@client/services/projects';
import * as routerActions from '../../router';

const { search } = schemaConstants;

class SearchActions extends PageActions {
  goTo = () => dispatch => dispatch(routerActions.locationPush('/'));
  searchUsers = searchText => dispatch => {
    return userServices.search(searchText).then(users => {
      dispatch(this.entities.getRelated('users', users));
      return users;
    });
  };
  searchInternships = searchText => dispatch => {
    return internshipServices.search(searchText).then(internships => {
      dispatch(this.entities.getRelated('internships', internships));
      return internships;
    });
  };
  searchProjects = searchText => dispatch => {
    return projectServices.search(searchText).then(projects => {
      dispatch(this.entities.getRelated('projects', projects));
      return projects;
    });
  };
}

export default new SearchActions(search);
