// @flow
import React, { PureComponent } from 'react';
import { Button, PanelContent, Navigation } from 'ui-kit';
import LinkedIn from 'components/oauth/LinkedIn';
import { button, nav } from './style.pcss';

type $props = Object;

export default class PreBase extends PureComponent {
  props: $props;
  render() {
    return (<PanelContent title={this.props.title}>
      <div className={nav}>
        <Navigation type="vertical">
          <LinkedIn />
          <Button className={button} onClick={this.props.emailAction}>Email</Button>
        </Navigation>
      </div>
    </PanelContent>);
  }
}
