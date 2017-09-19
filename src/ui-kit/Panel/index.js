// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { container, closePanel } from './style.pcss';


export class Panel extends PureComponent {
  render() {
    const { children, onClose } = this.props;
    return (<div className={classnames(container)}>
      <span onClick={onClose} className={closePanel}>x</span>
      {children}
    </div>);
  }
}
