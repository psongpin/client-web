// @flow
import { ULItem } from 'ui-kit';
import React, { PureComponent } from 'react';
import { ulItem } from './style.pcss';

export default class AppULItem extends PureComponent {
  render() {
    return (<ULItem
      className={ulItem}
      {...this.props}
    />);
  }
}
