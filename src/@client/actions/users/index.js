// @flow
import { List } from 'immutable';
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/users';
import internshipServices from '@client/services/internships';
import projectServices from '@client/services/projects';
import internServices from '@client/services/interns';
import oauthServices from '@client/services/oauth';
import { locationPush, queryReplace } from '../router';
import sessionActions from '../pages/session';
import flashActions from '../flash';

class UserActions extends Actions {
  // $FlowFixMe
  create = (user: Object) => (dispatch: $$dispatch) =>
    services
      .create(user)
      .then(({ session, id }) =>
        dispatch(sessionActions.login(session, { id, ...user }))
      );
  checkEmail = (email: string) =>
    services.checkEmail(email).then(emailExists => {
      if (emailExists) {
        return Promise.reject({
          email: ['Email already exists'],
        });
      }
      return Promise.resolve();
    });
  checkUsername = (username: string) =>
    services.checkUsername(username).then(usernameExists => {
      if (usernameExists) {
        return Promise.reject({
          username: ['Username already exists'],
        });
      }
      return Promise.resolve();
    });
  // $FlowFixMe
  get = userId => dispatch => {
    return dispatch(this.getUsers([userId]));
  };
  getLinkedInAuthUrl = () => {
    return oauthServices.getLinkedInAuthUrl();
  };
  getLoginToken = email => dispatch => {
    return services.getLoginToken(email).then(() => {
      return dispatch(
        flashActions.create('Please check your email for the login code')
      );
    });
  };
  createUsername = (
    id: string,
    token: string,
    username: string
  ) => dispatch => {
    return services.createUsername(id, token, username).then(jwt => {
      dispatch(queryReplace({ createUsername: '', id: '', token: '' }));
      dispatch(sessionActions.login(jwt, { id, username }));
    });
  };
  getUsers = (userIds: $$id[] | List<$$id>) => dispatch => {
    if (!userIds.length && !userIds.size) {
      return Promise.resolve();
    }
    return services.getUsers(userIds).then(users => {
      return dispatch(this.entities.index(users));
    });
  };
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/users/${id}`));
  goToEdit = (id: $$id) => dispatch =>
    dispatch(locationPush(`/users/${id}/edit`));
  find = (id: $$id) => dispatch =>
    services.get(id).then(user => dispatch(this.entities.get(user)));
  getInternships = (id: $$id) => dispatch =>
    internshipServices.byUser(id).then(internships => {
      return dispatch(this.entities.getRelated(id, 'internships', internships));
    });
  getProjects = (id: $$id) => dispatch =>
    projectServices.byUser(id).then(projects => {
      return dispatch(this.entities.getRelated(id, 'projects', projects));
    });
  getInterns = (id: $$id) => dispatch =>
    internServices.byUser(id).then(interns => {
      dispatch(this.entities.getRelated(id, 'interns', interns));
      return interns;
    });
}

export default new UserActions(schemaConstants.users, services);
