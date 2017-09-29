// @flow
import decode from 'jwt-decode';
import { PageActions } from '@client/utils/actionUtils';
import { set, remove } from '@client/utils/localStorageUtils';
import schemaConstants from '@client/schemas/pages/constants';
import services from '@client/services/sessions';

const { sessions } = schemaConstants;

class SessionActions extends PageActions {
  login = (token, user) => dispatch => {
    set('token', token);
    try {
      if (user) {
        return dispatch(this.entities.get({ token, user }));
      } else {
        const jwt = decode(token);
        return dispatch(this.entities.get({ token, user: jwt }));
      }
    } catch(e) {
      console.log(e);
    }
  }
  create = (creds: Object) => (dispatch: $$dispatch) => {
    return services.create(creds)
    .then(({ token, user }) => dispatch(this.login(token, user)));
  }
  checkIfLoggedIn = () => (dispatch: $$dispatch) => services.index()
    .then(({ token, user }) => dispatch(this.entities.get({ token, user })));
  logout = () => (dispatch: $$dispatch) => {
    remove('token');
    dispatch({ type: 'LOGOUT' });
  }
}

export default new SessionActions(sessions);
