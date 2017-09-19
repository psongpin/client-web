// @flow
import React from 'react';
import { List } from 'react-toolbox/lib/list';

type $props = {
  children?: any;
  className?: string;
}

export default ({ className, children, ...otherProps }: $props) => (
  <List className={className} {...otherProps}>{children}</List>
);
