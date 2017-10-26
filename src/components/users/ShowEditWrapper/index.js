// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, Column, Row } from 'ui-kit';
import userActions from '@client/actions/users';
import userSelectors from '@client/selectors/users';
import sessionSelectors from '@client/selectors/pages/sessions';
import User from '@client/models/User';
import UserInternshipsAndProjectsTabs from '../InternshipsAndProjectsTabs';
import { container } from './style.pcss';

type $ownProps = {
  children?: any,
};

type $stateProps = {
  id: $$id,
  user: User,
  canEdit: boolean,
};

type $dispatchProps = {
  find: (id: $$id) => void,
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class ShowEditWrapperUser extends PureComponent {
  props: $props;
  render() {
    const { id, canEdit } = this.props;
    return (
      <View className={container}>
        <Row>
          <Column xs={12} size={4}>
            {this.props.children}
          </Column>
          {
            <Column xs={12} size={8}>
              <UserInternshipsAndProjectsTabs owner={canEdit} id={id} />
            </Column>
          }
        </Row>
      </View>
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: userSelectors.getUserId,
  user: userSelectors.find(userSelectors.getUserId),
  canEdit: createSelector(
    [userSelectors.getUserId, sessionSelectors.getCurrentUserId()],
    (userId, currentUserId) => {
      return Number(userId) === Number(currentUserId);
    }
  ),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(userActions.get(id));
    },
  };
};

export const onIdChange = ({ id, find }: $props) => {
  find(id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange([[kheck('id'), onIdChange]]),
])(ShowEditWrapperUser);
