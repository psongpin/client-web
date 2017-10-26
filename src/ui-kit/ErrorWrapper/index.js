// @flow
import React, { PureComponent } from 'react';
import { display } from './style.pcss';

type $props = {
  children?: any,
};
export default class ErrorWrapper extends PureComponent {
  props: $props;
  render() {
    if (!this.props.children) {
      return null;
    }
    return <div className={display}>{this.props.children}</div>;
  }
}
