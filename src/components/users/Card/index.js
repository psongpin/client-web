// @flow
import React, { PureComponent } from 'react';
import { Markdown, CardTitle, CardText, Clickable } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import userSelectors from '@client/selectors/users';
import userActions from '@client/actions/users';
import UserDotX3 from '../DotX3';

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
          <UserDotX3>
            <Markdown content={user.description} />
          </UserDotX3>
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
