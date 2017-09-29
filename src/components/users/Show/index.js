// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, Header, Column, Row } from 'ui-kit';
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
    const { user, goToGravatar } = this.props;
    return (<View>
      <Row>
        <Column xs={12} size={4}>
          <Row>
            <Column>
              <Header>{user.username}</Header>
              <p>{user.points}</p>
            </Column>
          </Row>
          <Row>
            <Column>
              <img style={{ cursor: 'pointer' }} onClick={goToGravatar} alt="Profile" src={`https://www.gravatar.com/avatar/${user.email}?s=200&d=identicon`} />
            </Column>
          </Row>
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
    goToGravatar: ()=>{
      window.location.href = 'https://en.gravatar.com/';
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
