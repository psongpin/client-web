// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import classnames from 'classnames';
import { Button, Icon, PanelContent, Navigation } from 'ui-kit';
import userActions from '@client/actions/users';
import { button, googleButton, nav } from './style.pcss';

type $props = Object;

class PreBase extends PureComponent {
  state = {
    googleAuthUrl: '',
  }
  props: $props;
  componentWillMount(){
    this.props.getGoogleAuthUrl()
    .then((googleAuthUrl)=>{
      this.setState({
        googleAuthUrl,
      });
    });
  }
  goToGoogle = ()=>{
    window.location.href = this.state.googleAuthUrl;
  }
  render() {
    return (<PanelContent title={this.props.title}>
      <div className={nav}>
        <Navigation type="vertical">
          <Button onClick={this.goToGoogle} className={classnames(button, googleButton)}><Icon name="google" /> Google</Button>
          <Button className={button} onClick={this.props.emailAction}>Email</Button>
        </Navigation>
      </div>
    </PanelContent>);
  }
}

function mapDispatchToProps() {
  return {
    getGoogleAuthUrl: userActions.getGoogleAuthUrl,
  };
}

export default flowRight([
  connect(null, mapDispatchToProps),
])(PreBase);
