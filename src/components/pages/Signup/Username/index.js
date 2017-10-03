// @flow
import React, { PureComponent } from 'react';
import { Modal, ModalBody, TextInput, Button } from 'ui-kit';
import { form } from '@client/hoc';
import userActions from '@client/actions/users';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { getQuery } from '@client/selectors/router';

class SignupUsername extends PureComponent {
  render() {
    const { fields, actions } = this.props;
    return (
      <Modal noClose isOpen={this.props.createUsername} title="Create Username">
        <ModalBody>
          <TextInput type="text" {...fields.get('username').toObject()} />
          <Button
            {
              ...actions.submit
            }
          />
        </ModalBody>
      </Modal>
    );
  }
}

const fieldsSelector = (props)=>({
  username: {
    label: 'Username (public)',
    verify: [
      'required',
      'pattern:[a-z0-9 -]+:^Username can only contain alphanumeric characters:i',
    ],
    onChange: props.onUsernameChange,
  },
});

const actionsSelector = (props)=>({
  submit: props.submit,
});

const configSelector = () => ({
  isValid: false,
  interact: {
    context: 'SIGNUP',
  },
});

const mapDispatchToProps = (dispatch: $$dispatch, { id, token }: Object)=>({
  submit: ({ username }) => dispatch(userActions.createUsername(id, token, username)),
  onUsernameChange: ({ value }) => userActions.checkUsername(value),
});

const mapStateToProps = createStructuredSelector({
  id: getQuery('id'),
  token: getQuery('token'),
  createUsername: getQuery('createUsername'),
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  form(fieldsSelector, actionsSelector, configSelector),
])(SignupUsername);
