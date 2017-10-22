// @flow
import React, { PureComponent } from 'react';
import { Clickable, Button, PanelContent, Navigation } from 'ui-kit';
import LinkedIn from 'components/oauth/LinkedIn';
import { button, nav, termsOfService } from './style.pcss';
import TermsOfService from '../TermsOfService';

type $props = Object;

export default class PreBase extends PureComponent {
  props: $props;
  state = {
    iAgree: false,
    termsOfService: false,
  }
  iAgree = () => {
    this.setState({
      iAgree: true,
      termsOfService: false,
    });
  }
  closeTermsOfService = () => {
    this.setState({
      termsOfService: false,
    });
  }
  openTermsOfService = () => {
    this.setState({
      termsOfService: true,
    });
  }
  render() {
    return (<PanelContent title={this.props.title}>
      <TermsOfService isOpen={this.state.termsOfService} onClose={this.closeTermsOfService} iAgree={this.iAgree}/>
      <div className={termsOfService}>
        <p>You must agree to the <Clickable onClick={this.openTermsOfService}>TERMS OF SERVICES</Clickable> before signing up</p>
      </div>
      <div className={nav}>
        <Navigation type="vertical">
          <LinkedIn disabled={!this.state.iAgree} />
          {
            process.env.NODE_ENV !== 'producton' && <Button className={button} onClick={this.props.emailAction}>Email</Button>
          }
        </Navigation>
      </div>
    </PanelContent>);
  }
}
