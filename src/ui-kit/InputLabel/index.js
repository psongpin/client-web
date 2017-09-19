// @flow
import React, { PureComponent } from 'react';
import { inputLabel } from './style.pcss';

type $props = {
    children?: string,
}
export default class InputLabel extends PureComponent {
  props: $props;
  render() {
    const { children } = this.props;
    return <p className={inputLabel}>{children}</p>;
  }
}
