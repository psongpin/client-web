// @flow
import { PageActions } from '@client/utils/actionUtils';
import schemaConstants from '@client/schemas/pages/constants';

const { home } = schemaConstants;

class HomeActions extends PageActions {
}

export default new HomeActions(home);
