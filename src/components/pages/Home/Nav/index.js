// @flow
import React, { PureComponent } from 'react';

import { AppBar } from 'react-toolbox';
import { connect } from 'react-redux';

import { flowRight } from 'lodash';

import { Navigation } from 'ui-kit';

import searchActions from '@client/actions/pages/search';

import MainMenu from './MainMenu';

export class Nav extends PureComponent {
  props: Object;
  render() {
    return (
      <AppBar
        onLeftIconClick={this.props.goToSearch}
        title="Menternship"
        leftIcon="home"
      >
        <Navigation type="horizontal">
          <MainMenu />
        </Navigation>
      </AppBar>
    );
  }
}

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    goToSearch() {
      dispatch(searchActions.goTo());
    },
  };
}

export default flowRight([connect(null, mapDispatchToProps)])(Nav);
