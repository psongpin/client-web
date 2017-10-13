// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, CardText, Column, Row, Card, CardTitle } from 'ui-kit';
import userActions from '@client/actions/users';
import userSelectors from '@client/selectors/users';
import sessionSelectors from '@client/selectors/pages/sessions';
import User from '@client/models/User';
import UserInternshipsAndProjectsTabs from '../InternshipsAndProjectsTabs';
import { container } from './style.pcss';


type $stateProps = {
  id: $$id,
  user: User,
};

type $dispatchProps = {
  find: (id: $$id)=>void;
};

type $props = $stateProps & $dispatchProps;

export class ShowUser extends PureComponent {
  props: $props;
  render() {
    const { user, id } = this.props;
    return (<View className={container}>
      <Row>
        <Column xs={12} size={4}>
          <Card>
            <CardTitle
              title={user.username}
              avatar={user.imageUrl}
            />
            <CardText>
              {user.description}
            </CardText>
          </Card>
        </Column>
        {
          <Column xs={12} size={8}>
            <UserInternshipsAndProjectsTabs id={id} />
          </Column>
        }
      </Row>
    </View>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: userSelectors.getUserId,
  user: userSelectors.find(userSelectors.getUserId),
  canEdit: createSelector([
    userSelectors.getUserId,
    sessionSelectors.getCurrentUserId(),
  ], (userId, currentUserId)=>{
    return userId === currentUserId;
  }),
});

export const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(userActions.find(id));
    },
  };
};

export const onIdChange = ({
  id, find,
}: $props) => {
  find(id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange([
    [kheck('id'), onIdChange],
  ]),
])(ShowUser);
