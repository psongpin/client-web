// @flow
import React from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import classnames from 'classnames';
import { nonStringContent, clickable } from './style.pcss';

type $props = {
  children?: any;
  className?: string;
  rightActions?: any[];
  leftActions?: any[];
  subtitle?: string;
  ripple?: boolean;
  onClick?: Function;
}

export default (props: $props) => {
  const {
    className,
    leftActions = [],
    rightActions = [],
    children,
    onClick,
    ripple,
    subtitle: legend,
    ...otherProps
} = props;
  const stringContent = typeof children === 'string' || typeof children === 'number';
  const properties = {
    leftActions,
    rightActions,
    legend,
    onClick,
    ripple,
    [stringContent ? 'caption' : 'itemContent']: stringContent ? children :
    <div className={nonStringContent}>{children}</div>,
  };
  return (<ListItem
    className={classnames(className, {
      [clickable]: ripple === undefined,
    })}
    {...properties}
    {...otherProps}
  />);
};
