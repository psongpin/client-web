// @flow
import React, { PureComponent } from 'react';

import { Layout, Panel, Sidebar } from 'react-toolbox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PanelContainer from 'components/panels';

import * as routerSelectors from '@client/selectors/router';

import sessionActions from '@client/actions/pages/session';
import flashActions from '@client/actions/flash';
import panelRoutes from 'components/panels/panelRoutes';
import SignupUsername from 'components/pages/Signup/Username';
import Flash from './Flash';
import Nav from './Nav';
import Footer from './Footer';
import { mainContent } from './style.pcss';

function defaultConditionalLocation() {
  return false;
}

class MainContainer extends PureComponent {
  props: Object;
  componentWillMount() {
    if (this.props.auth) {
      this.props.login(this.props.auth);
      this.props.checkIfLoggedIn();
    }
    this.props.getFlash(this.props.flash);
  }
  render() {
    const {
      panel,
      children,
      pathname,
    } = this.props;
    // $FlowFixMe
    const { conditionalLocation = defaultConditionalLocation } = panelRoutes(panel.location);
    const pinned = panel.open && !conditionalLocation(panel, pathname);
    return (<Layout>
      <Panel>
        <Nav />
        <div className={mainContent}>
          {children}
        </div>
        <SignupUsername />
        <Footer />
      </Panel>
       
      <Sidebar className="panel" pinned={pinned} width={12}>
        <PanelContainer />
      </Sidebar>
      <Flash />
    </Layout>);
  }
}

const mapStateToProps = createStructuredSelector({
  auth: routerSelectors.getQuery('auth'),
  panel: routerSelectors.getPanel,
  pathname: routerSelectors.getPathname,
  confirmedEmail: routerSelectors.getQuery('emailConfirm'),
  flash: routerSelectors.getFlash,
});

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    login(auth) {
      dispatch(sessionActions.login(auth));
    },
    checkIfLoggedIn() {
      dispatch(sessionActions.checkIfLoggedIn());
    },
    flashSuccessEmailConfirmation(error) {
      dispatch(flashActions.create(error ? 'Your email was not successfully confirmed' : 'Your email was confirmed'))
    },
    getFlash(flash) {
      if (Object.keys(flash).length) {
        dispatch(flashActions.fromServer(flash));
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
