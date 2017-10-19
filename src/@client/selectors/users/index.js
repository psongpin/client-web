// @flow
import Selector from '@client/utils/selectorUtils';
import User from '@client/models/User';
import { createSelector } from 'reselect';
import sessionSelectors from '../pages/sessions';
import { getIdParam } from '../router';

const { users } = require('@client/schemas/constants');

class UserSelectors extends Selector {
  getUserFromSession = () => this.find(sessionSelectors.findRelatedId('user'))
  getUserId = getIdParam(0)
  canEdit = (userIdSelector) => createSelector([
    userIdSelector,
    sessionSelectors.getCurrentUserId(),
  ], (userId, currentUserId) => {
    return Number(userId) === Number(currentUserId);
  })
}

export default new UserSelectors(users, new User());
