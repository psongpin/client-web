// @flow
import React from 'react';

type $props = {
  children?: any;
  className?: string;
}

export const View = (props: $props) => <div className={props.className}>{props.children}</div>;
