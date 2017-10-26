// @flow
import React, { PureComponent } from 'react';
import { Button, CardTitle, Clickable, CardActions } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { statusTypes, finished } from '@client/models/Intern';
import internSelectors from '@client/selectors/interns';
import userSelectors from '@client/selectors/users';
import internActions from '@client/actions/interns';
import userActions from '@client/actions/users';
import MinutesAndStatus from '../MinutesAndStatus';

type $props = Object;

class InternCard extends PureComponent {
  props: $props;
  goToUser = () => {
    this.props.goToUser(this.props.userId);
  };
  render() {
    const { props } = this;
    return (
      <GridCard>
        <CardTitle
          title={
            <Clickable onClick={this.goToUser}>{props.user.username}</Clickable>
          }
        />
        <MinutesAndStatus intern={props.intern} />
        {props.owner &&
          !finished(props.intern) && (
            <CardActions>
              <Button
                confirmationMessage="Are you sure you want to mark this intern as completed"
                onConfirmClick={props.completed}
              >
                Approve Completion
              </Button>
              <Button
                confirmationMessage="Are you sure you want to mark this intern as fired"
                onConfirmClick={props.fire}
              >
                Fire Intern
              </Button>
            </CardActions>
          )}
      </GridCard>
    );
  }
}

const mapStateToPropsFactory = () => {
  const getUserId = internSelectors.findRelatedId('user');
  return createStructuredSelector({
    intern: internSelectors.find(),
    userId: getUserId,
    user: userSelectors.find(getUserId),
  });
};

const mapDispatchToProps = (dispatch: $$dispatch, { id }) => {
  return {
    goTo: () => dispatch(internActions.goTo(id)),
    goToUser: userId => dispatch(userActions.goTo(userId)),
    completed: () =>
      dispatch(internActions.changeStatus(id, statusTypes.COMPLETED)),
    fire: () => dispatch(internActions.changeStatus(id, statusTypes.FIRED)),
  };
};

export default flowRight([
  connect(mapStateToPropsFactory),
  connect(null, mapDispatchToProps),
])(InternCard);
