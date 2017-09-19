// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { form } from '@client/hoc';
import { LinkedTextInput, Button, PanelContent } from 'ui-kit';

import userActions from '@client/actions/users';
import { closePanel } from '@client/actions/router';

class Signup extends PureComponent {
  render() {
    const { fields, actions } = this.props;
    return (<PanelContent title={'Signup'}>
      <LinkedTextInput type="text" field={fields.get('username')} />
      <LinkedTextInput type="email" field={fields.get('email')} />
      <Button
        {
          ...actions.submit
        }
      />
    </PanelContent>);
  }
}

const fieldsSelector = (props)=>({
  email: {
    label: 'Email',
    verify: ['email', 'required'],
    onChange: props.onEmailChange,
  },
  username: {
    label: 'Username (public)',
    verify: [
      'required',
      'pattern:[a-z0-9 -]+:^Username can only contain alphanumeric characters:i',
    ],
    onChange: props.onUsernameChange,
  },
});

const actionsSelector = ({ submit })=>({
  submit,
});

const configSelector = () => ({
  isValid: false,
  interact: {
    context: 'SIGNUP',
  },
});

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    submit(newUser) {
      return dispatch(userActions.create(newUser))
      .then(() => {
        return dispatch(closePanel());
      });
    },
    onEmailChange(emailField) {
      return userActions.checkEmail(emailField.get('value'));
    },
    onUsernameChange(usernameField) {
      return userActions.checkUsername(usernameField.get('value'));
    },
  };
}

export default flowRight([
  connect(null, mapDispatchToProps),
  form(fieldsSelector, actionsSelector, configSelector),
])(Signup);
