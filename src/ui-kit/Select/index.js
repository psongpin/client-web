// @flow
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import { List } from 'immutable';
import React, { PureComponent } from 'react';
import InputLabel from '../InputLabel';

type $option = {
  value: any,
  label: string,
};

type $props = {
  options: $option[] | List<$option>,
  className?: string,
  onChange?: (value: any) => any,
  value: any,
  label?: string,
};

export default class Select extends PureComponent {
  props: $props;
  render() {
    const { className, options, value, onChange, label, ...props } = this.props;
    return (
      <div>
        {label && <InputLabel>{label}</InputLabel>}
        <ReactSelect
          className={className}
          options={options}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
}
