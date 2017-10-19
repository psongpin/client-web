// @flow
import React, { PureComponent } from 'react';
import { CardTitle, CardText, Clickable } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import userSelectors from '@client/selectors/users';
import userActions from '@client/actions/users';

type $props = Object;

class UserCard extends PureComponent {
  props: $props;
  render() {
    const { user, ...props } = this.props;
    return (
      <GridCard>
        <CardTitle
          title={<Clickable onClick={props.goTo}>{user.username}</Clickable>}
        />
        <CardText>
          {user.description}
        </CardText>
      </GridCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelectors.find(),
});

const mapDispatchToProps = (dispatch: $$dispatch, props: $props) => ({
  goTo() {
    return dispatch(userActions.goTo(props.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
