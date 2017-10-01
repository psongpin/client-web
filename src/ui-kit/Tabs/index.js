// @flow
import React, { PureComponent } from 'react';
import { Tabs } from 'react-toolbox';

export default class extends PureComponent {
  state = {
    index: 0,
  }
  handleTabChange = (index: number) => {
    this.setState({ index });
  }
  render() {
    return <Tabs index={this.state.index} onChange={this.handleTabChange}>{this.props.children}</Tabs>;
  }
}
