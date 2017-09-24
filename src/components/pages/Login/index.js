
// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';

import { form } from '@client/hoc';
import { LinkedTextInput, Button, PanelContent } from 'ui-kit';
import sessionActions from '@client/actions/pages/session';
import userActions from '@client/actions/users';
import { closePanel } from '@client/actions/router';

// import { createMessage, sendMessages } from '@client/utils/messageUtils';
// import { queryPush } from '@client/utils/routerUtils';

// import { LOGIN } from './actionHandlers';

class Login extends PureComponent {
  render() {
    const { fields, actions } = this.props;
    return (<PanelContent title={'Login'}>
      <LinkedTextInput type="email" field={fields.get('email')} />
      {
        fields.getIn(['email', 'value']) && <Button onClick={()=>this.props.getLoginToken(fields.getIn(['email', 'value']))}>Get Token</Button>
      }
      {
        fields.getIn(['email', 'value']) && <LinkedTextInput type="password" field={fields.get('loginToken')} />
      }
      <Button
        {
					...actions.submit
				}
      />
    </PanelContent>);
  }
}

const fieldsSelector = () => ({
  email: {
    verify: ['email', 'required'],
    isValid: false,

  },
  loginToken: {
    verify: ['required', 'minLength:6'],
  },
});

const actionsSelector = ({ submit }) => ({
  submit,
});

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    getLoginToken(email) {
      return dispatch(userActions.getLoginToken(email));
    },
    submit(user) {
      return dispatch(sessionActions.create(user))
      .then(() => dispatch(closePanel()));
    },
  };
}

export default flowRight([
  connect(null, mapDispatchToProps),
  form(fieldsSelector, actionsSelector),
])(Login);
