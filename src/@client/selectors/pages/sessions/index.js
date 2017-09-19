// @flow
import { createSelector } from 'reselect';

import { PageSelector } from '@client/utils/selectorUtils';
import Session from '@client/models/pages/Session';

const { sessions } = require('@client/schemas/pages/constants');

class SessionPageSelector extends PageSelector {
  isLoggedIn = () => createSelector(
    [
      this.findEntity(),
    ],
    (session: Session) => !!session.token,
  )
  getCurrentUserId = () => this.findRelatedEntityId('user')
}

export default new SessionPageSelector(sessions, new Session());
