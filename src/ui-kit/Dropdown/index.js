// @flow
import DropdownTB from 'react-toolbox/lib/dropdown';
import React, { PureComponent } from 'react';

type $props = Object;

export default class Dropdown extends PureComponent {
  props: $props;
  handleChange = (value: any) => {
    this.props.onChange({
      name: this.props.name,
      value,
    });
  };
  render() {
    const { onChange, ...otherProps } = this.props;
    return <DropdownTB {...otherProps} onChange={this.handleChange} />;
  }
}
