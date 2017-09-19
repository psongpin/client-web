// @flow
import React from 'react';
import { Grid as GridFB } from 'react-flexbox-grid';

type $props = {
  children?: any;
}

export default ({ children, ...props }: $props) => <GridFB {...props} fluid>{children}</GridFB>;
