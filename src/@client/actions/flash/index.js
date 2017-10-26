// @flow
import * as routerActions from '@client/actions/router';

type $flashObject = {
  name: string,
  error?: boolean,
  params?: Object,
};

type $flashOptions = {
  action?: string,
  type?: 'accept' | 'warning' | 'cancel',
};

class FlashActions {
  server: Object;
  constructor() {
    this.server = {
      unsubscribe: () => this.create('Subscription Terminated'),
      confirmEmail: () => this.create('Your email has been confirmed'),
      getLoginToken: () =>
        this.create('The login code has been sent to your email'),
    };
  }
  create = (label: any, flashOptions?: $flashOptions = {}) => ({
    type: 'CREATE_FLASH',
    payload: {
      label,
      action: flashOptions.action,
      type: flashOptions.type,
    },
  });
  close = (dispatch: $$dispatch) => dispatch({ type: 'DELETE_FLASH' });
  fromServer = (flash: $flashObject) => (dispatch: $$dispatch) => {
    dispatch(this.server[flash.name](flash.error, flash.params));
    dispatch(routerActions.removeQuery({ flash }));
  };
}
export default new FlashActions();
