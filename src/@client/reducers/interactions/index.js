// @flow
import { handleActions } from 'redux-actions';
import interactionService from '../../services/interactions';

export default handleActions(
  {
    ['@@router/LOCATION_CHANGE'](state, { payload }) {
      // $FlowFixMe
      const left = window.pageXOffset || document.documentElement.scrollLeft;
      // $FlowFixMe
      const top = window.pageYOffset || document.documentElement.scrollTop;
      const height = window.innerHeight;
      const width = window.innerWidth;

      interactionService.create({
        meta: JSON.stringify({
          height,
          width,
          top,
          left,
        }),
      });
      return state;
    },
  },
  {}
);
