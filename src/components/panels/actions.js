import { closePanel } from '@client/actions/router';

export function close() {
  return (dispatch) => {
    dispatch(closePanel());
  };
}
