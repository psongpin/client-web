// @flow
import React, { PureComponent } from 'react';

import { AppBar } from 'react-toolbox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import {
  MainNavDropdown,
  MainNavDropdownItem,
  MainNavDropdownDivider,
} from 'ui-kit';
import userSelectors from '@client/selectors/users';
import sessionSelectors from '@client/selectors/pages/sessions';

import { openPrelogin, openPresignup } from '@client/actions/panels';

import userActions from '@client/actions/users';

import sessionActions from '@client/actions/pages/session';


const { search: searchLocation } = require('@client/actions/panels/locations');

export class Nav extends PureComponent {
  props: Object;
  render() {
    const {
      session,
      goHome,
      onSignup,
      onLogin,
      user,
      onLogout,
      goToUser,
    } = this.props;
    const { token: loggedIn } = session;
    return (
      <AppBar title="Title" leftIcon="home" onLeftIconClick={goHome}>
        <MainNavDropdown icon="more_vert">
          {
            !loggedIn && <MainNavDropdownItem onClick={onSignup}>
            Signup
          </MainNavDropdownItem>
          }
          {
            !loggedIn && <MainNavDropdownItem onClick={onLogin}>
              Login
            </MainNavDropdownItem>
          }
          {
            loggedIn && <MainNavDropdownItem onClick={()=>goToUser(user.id)}>
              {user.username}
            </MainNavDropdownItem>
          }
          {
            loggedIn && <MainNavDropdownItem onClick={onLogout}>
              Logout
            </MainNavDropdownItem>
          }
        </MainNavDropdown>
      </AppBar>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelectors.getUserFromSession(),
  session: sessionSelectors.findEntity(),
});

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    checkIfLoggedIn() {
      dispatch(sessionActions.checkIfLoggedIn());
    },
    onSignup() {
      dispatch(openPresignup);
    },
    onLogin() {
      dispatch(openPrelogin);
    },
    onLogout() {
      dispatch(sessionActions.logout());
    },
    goToUser(id) {
      dispatch(userActions.goTo(id));
    },
  };
}

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
])(Nav);
