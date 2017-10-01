// @flow
import React, { PureComponent } from 'react';
import { Card } from 'ui-kit';
import { container } from './style.pcss';

export default class GridCard extends PureComponent {
  render() {
    return (
      <Card className={container}>
        {this.props.children} 
      </Card>
    );
  }
}
