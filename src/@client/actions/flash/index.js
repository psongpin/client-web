import qs from 'qs';
import * as routerActions from '@client/actions/router';
// @flow
type $flashOptions = {
  action: string,
  type: 'accept' | 'warning' | 'cancel',
}

class FlashActions {
  close = (dispatch: $$dispatch) => dispatch({ type: 'DELETE_FLASH' })
  create = (label: any, { action, type }?: $flashOptions = {})=>({
    type: 'CREATE_FLASH',
    payload: {
      label,
      action,
      type,
    },
  })
  fromServer = (flash) => dispatch => {
    dispatch(this[`${flash.name}Server`](flash.error, flash.params));
    dispatch(routerActions.removeQuery({ flash }));
  }
  unsubscribeServer = () => this.create('Subscription Terminated');
  confirmEmailServer = () => this.create('Your email has been confirmed');
  getLoginTokenServer = () => this.create('The login code has been sent to your email');
}
export default new FlashActions();

