// @flow
import React from 'react';
import { container } from './style.pcss';

export default class PointsTotal extends React.PureComponent {
  render(){
    return <div className={container}>{this.props.points}</div>;
  }
}
