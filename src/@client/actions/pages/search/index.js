// @flow
import { PageActions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/pages/constants';
import * as routerActions from '../../router';

const { search } = schemaConstants;

class SearchActions extends PageActions {
  goTo = ()=>dispatch=>dispatch(routerActions.locationPush('/search'));
};

export default new SearchActions(search);
