// @flow
import * as routerActions from '@client/actions/router';

type $flashOptions = {
  action?: string,
  type?: 'accept' | 'warning' | 'cancel',
};

class FlashActions {
  create = (label: any, flashOptions?: $flashOptions = {}) => ({
    type: 'CREATE_FLASH',
    payload: {
      label,
      action: flashOptions.action,
      type: flashOptions.type,
    },
  });
  close = (dispatch: $$dispatch) => dispatch({ type: 'DELETE_FLASH' });
  fromServer = flash => dispatch => {
    dispatch(this[`${flash.name}Server`](flash.error, flash.params));
    dispatch(routerActions.removeQuery({ flash }));
  };
  unsubscribeServer = () => this.create('Subscription Terminated');
  confirmEmailServer = () => this.create('Your email has been confirmed');
  getLoginTokenServer = () =>
    this.create('The login code has been sent to your email');
}
export default new FlashActions();
