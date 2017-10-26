// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { style } from './style.pcss';

export default class Clickable extends PureComponent {
  render() {
    const { children, className, ...props } = this.props;
    return (
      <span {...props} className={classnames(style, className)}>
        {children}
      </span>
    );
  }
}
