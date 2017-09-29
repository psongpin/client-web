// @flow
// $FlowFixMe
import erschemaReducer from 'erschema-redux-immutable/reducers';
import schema from '@client/schemas';
import pageSchema from '@client/schemas/pages';
import * as pageOtherActionHandlers from './pages';
import flash from './flash';


export default {
  erschema: erschemaReducer({
    schema,
    pageSchema,
    pageOtherActionHandlers,
  }),
  flash,
};
