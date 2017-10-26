// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import TextInput from '../';

export default class LinkedTextInput extends PureComponent {
  props: {
    field: Map<string, any>,
  };
  render() {
    const { field, ...otherProps } = this.props;
    const {
      name,
      onChange,
      label,
      value,
      errors,
      onKeyPress,
    } = field.toObject();
    const combinedProps = {
      name,
      onChange,
      label,
      value,
      errors,
      onKeyPress,
      ...otherProps,
    };
    return <TextInput {...combinedProps} />;
  }
}
