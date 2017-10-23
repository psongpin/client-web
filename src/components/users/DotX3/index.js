// @flow
import React, { PureComponent } from 'react';
import DotX3 from 'react-dotdotdot';

export default class ProjectDotX3 extends PureComponent {
  render() {
    return <DotX3 clamp="100px">{this.props.children}</DotX3>;
  }
}
