// @flow
import React, { PureComponent } from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Chip, Clickable } from 'ui-kit';
import User from '@client/models/User';
import userSelectors from '@client/selectors/users';
import userActions from '@client/actions/users';

type $ownProps = {
  id: $$id,
}

type $stateProps = {
  user: User,
}
type $dispatchProps = {
  goToUser: Function;
}
type $props = $stateProps & $dispatchProps & $ownProps;

export class UsersChip extends PureComponent {
  props: $props
  render() {
    const { user, goToUser } = this.props;
    return (<Chip>
      <Clickable onClick={goToUser}>{user.username}</Clickable>
    </Chip>);
  }
}
const mapDispatchToProps = (dispatch: $$dispatch, { id }: $ownProps)=>({
  goToUser: ()=>dispatch(userActions.goTo(id)),
});
const mapStateToProps = createStructuredSelector({
  user: userSelectors.find(),
});

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
])(UsersChip);
