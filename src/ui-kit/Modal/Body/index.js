// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';

type $props = {
  children?: any;
  className?: string;
}

export default class ModalBody extends PureComponent {
  props: $props;
  render() {
    const { children, className } = this.props;
    return (<div className={classnames(className)}>
      {children}
    </div>);
  }
}
