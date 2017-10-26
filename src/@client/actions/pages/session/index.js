// @flow
import decode from 'jwt-decode';
import { PageActions } from '@client/utils/actionUtils';
import { set } from '@client/utils/localStorageUtils';
import schemaConstants from '@client/schemas/pages/constants';
import services from '@client/services/sessions';
import * as routerActions from '../../router';

const { sessions } = schemaConstants;

class SessionActions extends PageActions {
  login = token => dispatch => {
    set('token', token);
    const jwt = decode(token);
    dispatch(this.entities.get({ token, user: jwt }));
    dispatch(routerActions.removeQuery({ auth: token }));
  };
  create = (creds: Object) => (dispatch: $$dispatch) => {
    return services
      .create(creds)
      .then(({ token, user }) => dispatch(this.login(token, user)));
  };
  checkIfLoggedIn = () => (dispatch: $$dispatch) =>
    services
      .index()
      .then(({ token, user }) => dispatch(this.entities.get({ token, user })));
  logout = () => (dispatch: $$dispatch) => {
    dispatch({ type: 'LOGOUT' });
    dispatch(routerActions.locationPush('/'));
  };
}

export default new SessionActions(sessions);
