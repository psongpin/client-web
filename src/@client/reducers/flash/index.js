import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

const DefaultState = Record({
  active: false,
  action: '',
  type: '',
  label: '',
  timeout: 2000,
});

export default handleActions({
  CREATE_FLASH(state, { payload }) {
    return state.merge({
      active: true,
      action: payload.action || 'Dismiss',
      type: payload.type || 'accept',
      label: payload.label,
      timeout: payload.timeout || 2000,
    });
  },
  DELETE_FLASH(state) {
    return state.merge({
      active: false,
    });
  },
}, new DefaultState());
