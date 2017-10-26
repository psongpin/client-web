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
      return dispatch(this.entities.getRelated('users', users));
    });
  };
  searchInternships = searchText => dispatch => {
    return internshipServices.search(searchText).then(internships => {
      return dispatch(this.entities.getRelated('internships', internships));
    });
  };
  searchProjects = searchText => dispatch => {
    return projectServices.search(searchText).then(projects => {
      return dispatch(this.entities.getRelated('projects', projects));
    });
  };
}

export default new SearchActions(search);
