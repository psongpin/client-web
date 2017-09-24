// @flow
import decode from 'jwt-decode';
import { PageActions } from '@client/utils/actionUtils';
import { set, remove } from '@client/utils/localStorageUtils';
import schemaConstants from '@client/schemas/pages/constants';
import services from '@client/services/sessions';

const { sessions } = schemaConstants;

class SessionActions extends PageActions {
  login = (token, user) => {
    set('token', token);
    if (user) {
      return this.actions.get({ token, user });
    }
    const jwt = decode(token);
    return this.actions.get({ token, user: jwt });
  }
  create = (creds: Object) => (dispatch: $$dispatch) => {
    return services.create(creds)
    .then(({ token, user }) => dispatch(this.login(token, user)));
  }
  checkIfLoggedIn = () => (dispatch: $$dispatch) => services.index()
    .then(({ token, user }) => dispatch(this.actions.get({ token, user })));
  logout = () => (dispatch: $$dispatch) => {
    remove('token');
    dispatch({ type: 'LOGOUT' });
  }
}

export default new SessionActions(sessions);
