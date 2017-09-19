// @flow
import React, { PureComponent } from 'react';
import { MenuItem } from 'react-toolbox/lib/menu';

export class MainNavDropdownItem extends PureComponent {
  props: {
    children?: any
  }
  render() {
    const { children, ...props } = this.props;
    return <MenuItem value={children}{...props} caption={children} />;
  }
}
export default MainNavDropdownItem;
