// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { form } from '@client/hoc';
import { CodeMirror, CardText, Card, CardTitle, TextInput, CardActions, Button } from 'ui-kit';
import userActions from '@client/actions/users';
import userSelectors from '@client/selectors/users';

import User from '@client/models/User';


type $stateProps = {
  id: $$id,
  user: User,
  fields: any,
};

type $dispatchProps = {
  update: Function;
  goBack: Function;
};

type $props = $stateProps & $dispatchProps;

export class EditUser extends PureComponent {
  props: $props;
  render() {
    const { user, ...props } = this.props;
    return (<Card>
      <CardTitle
        title={user.username}
        avatar={user.imageUrl}
      />
      <CardText>
        <CodeMirror {...props.fields.get('description').toObject()} />
      </CardText>
      <CardActions>
        <Button onClick={props.goBack}>Go Back</Button>
      </CardActions>
    </Card>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: userSelectors.getUserId,
  user: userSelectors.find(userSelectors.getUserId),
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props) : $Exact<$dispatchProps> => ({
  update({ value }) {
    return dispatch(userActions.update(props.id, { description: value }));
  },
  goBack() {
    return dispatch(userActions.goTo(props.id));
  },
});

const fieldsSelector = (props) => ({
  description: {},
});

const actionsSelector = (props) => ({
  update: props.update,
});

const configSelector = (props) => ({
  initialValuesPropName: 'user',
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  form(fieldsSelector, actionsSelector, configSelector),
])(EditUser);
