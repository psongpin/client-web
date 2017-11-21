// @flow
import React from 'react';
import RCheckbox from 'react-toolbox/lib/checkbox';

export default class Checkbox extends React.PureComponent {
  handleChange = (value: string, event: Object) => {
    return this.props.onChange({
      name: event.target.name,
      value,
    });
  };
  render() {
    return (
      <RCheckbox
        {...this.props}
        checked={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}
