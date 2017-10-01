// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, CardText, Column, Row, Card, CardTitle } from 'ui-kit';
import userActions from '@client/actions/users';
import userSelectors from '@client/selectors/users';
import User from '@client/models/User';


type $stateProps = {
  id: $$id,
  user: User,
};

type $dispatchProps = {
  find: (id: $$id)=>void;
  goToGravatar: ()=>void;
};

type $props = $stateProps & $dispatchProps;

export class ShowUser extends PureComponent {
  props: $props;
  render() {
    const { user } = this.props;
    return (<View>
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
      </Row>
    </View>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: userSelectors.getUserId,
  user: userSelectors.find(userSelectors.getUserId),
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
