// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { Button, CardText, Card, CardTitle, CardActions } from 'ui-kit';
import userActions from '@client/actions/users';
import userSelectors from '@client/selectors/users';
import User from '@client/models/User';


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
    const { user, ...props } = this.props;
    return (<Card>
      <CardTitle
        title={user.username}
        avatar={user.imageUrl}
      />
      <CardText>
        {user.description}
      </CardText>
      {
        props.canEdit && <CardActions>
          <Button onClick={props.goToEdit}>Edit</Button>
        </CardActions>
      }
    </Card>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: userSelectors.getUserId,
  user: userSelectors.find(userSelectors.getUserId),
  canEdit: userSelectors.canEdit(userSelectors.getUserId),
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props) => ({
  goToEdit() {
    dispatch(userActions.goToEdit(props.id));
  },
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
])(ShowUser);
