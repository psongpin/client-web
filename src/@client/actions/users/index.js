// @flow
import { List } from 'immutable';
import { Actions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/constants';
import services from '@client/services/users';
import { locationPush, queryReplace } from '../router';
import sessionActions from '../pages/session';
import flashActions from '../flash';

const { users: USERS } = schemaConstants;

class UserActions extends Actions {
  create = (user: Object) => (dispatch: $$dispatch) => services.create(user)
    .then(({ session, id }) => dispatch(sessionActions.login(session, { id, ...user })));
  checkEmail = (email: string) => services.checkEmail(email)
    .then((emailExists) => {
      if (emailExists) {
        return Promise.reject({
          email: ['Email already exists'],
        });
      }
      return Promise.resolve();
    });
  checkUsername = (username: string) => services.checkUsername(username)
    .then((usernameExists) => {
      if (usernameExists) {
        return Promise.reject({
          username: ['Username already exists'],
        });
      }
      return Promise.resolve();
    });
  get = (userId) => dispatch => {
    return dispatch(this.getUsers([userId]));
  }
  getGoogleAuthUrl = ()=>{
    return services.getGoogleAuthUrl();
  }
  getLoginToken = (email)=>dispatch => {
    return services.getLoginToken(email)
    .then(()=>{
      return dispatch(flashActions.create('Please check your email for the login code'));
    });
  }
  createUsername = (id: string, token: string, username: string) => dispatch => {
    return services.createUsername(id, token, username).then((jwt)=>{
      dispatch(queryReplace({ createUsername: '', id: '', token: '' }));
      dispatch(sessionActions.login(jwt, { id, username }));
    });
  }
  getUsers = (userIds: $$id[] | List<$$id>) => dispatch => {
    if (!userIds.length && !userIds.size) {
      return Promise.resolve();
    }
    return services.getUsers(userIds)
    .then(users => {
      return dispatch(this.actions.index(users));
    });
  }
  goTo = (id: $$id) => dispatch => dispatch(locationPush(`/users/${id}`))
  find = (id: $$id) => dispatch =>
    services.get(id)
    .then(user => dispatch(this.actions.get(user)));
}

export default new UserActions(USERS);
