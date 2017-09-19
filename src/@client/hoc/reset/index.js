// @flow
import React, { PureComponent } from 'react';

export const reactReset = function reactReset(WrappedComponent: any) {
  return class Reset extends PureComponent {
    state = {
      uuid: Math.random(),
    }
    render() {
      return (<WrappedComponent
        {...this.props}
        key={this.state.uuid}
        reset={this.reset}
      />);
    }
    reset = () => {
      this.setState({
        uuid: Math.random(),
      });
    }
  };
};
