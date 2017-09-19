// @flow
import React, { PureComponent } from 'react';

import { Grid, Row as RowFB } from 'react-flexbox-grid';

type $props = {
  children?: any;
  noGrid?: boolean;
}

export default class Row extends PureComponent {
  props: $props;
  render() {
    const { children, noGrid, ...props } = this.props;
    if (noGrid) {
      return this.renderRow();
    }
    return (<Grid fluid>
      {this.renderRow()}
    </Grid>);
  }
  renderRow = () => {
    const { children, noGrid, ...props } = this.props;
    return (<RowFB {...props}>
      {this.props.children}
    </RowFB>);
  }
}
