// @flow
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Clickable } from 'ui-kit';
import userSelectors from '@client/selectors/users';
import userActions from '@client/actions/users';

type $props = Object;

export class GoToUser extends React.PureComponent {
  props: $props;
  render() {
    return (
      <Clickable onClick={this.props.goTo}>
        {this.props.user.username}
      </Clickable>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  user: userSelectors.find(),
});

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $props) => ({
  goTo: () => dispatch(userActions.goTo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoToUser);
