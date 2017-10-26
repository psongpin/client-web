// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import Input from 'react-toolbox/lib/input';
import { debounce } from 'lodash';

const noop = () => {};
type $props = {
  name?: string,
  errors?: Map<string, string>,
  onChange: () => void,
  value?: any,
  email?: boolean,
  tel?: boolean,
  label?: string,
  placeholder?: string,
  multi?: boolean,
  readonly?: boolean,
  onEnter?: Function,
  isDirty?: boolean,
  initialValue?: any,
  isValid?: boolean,
  verify?: Function,
  onKeyPress?: Function,
  debounce?: boolean | number,
  type?: string,
};

export class TextInput extends PureComponent {
  props: $props;
  input: any;
  onChange: Function;
  constructor(props: $props) {
    super(props);
    if (props.debounce) {
      this.onChange = debounce(
        this.onRegularChange,
        typeof props.debounce === 'number' ? props.debounce : 500
      );
    } else {
      this.onChange = this.onRegularChange;
    }
  }
  shouldComponentUpdate(nextProps: $props) {
    return (
      this.props.value !== nextProps.value ||
      this.props.errors !== nextProps.errors
    );
  }
  getType = () => {
    if (this.props.email) {
      return 'email';
    }
    if (this.props.tel) {
      return 'tel';
    }
    return this.props.type;
  };
  setInput = (input: any) => {
    this.input = input;
  };
  getInput = () => {
    return this.input;
  };
  handleOnEnter = (event: Object) => {
    if (event.key === 'Enter' && this.props.onEnter) {
      this.props.onEnter(event.target.value);
    }
  };
  handleKeyPress = (event: Object) => {
    if (this.props.onEnter) {
      this.handleOnEnter(event);
    }
    if (this.props.onKeyPress) this.props.onKeyPress(event);
  };
  render() {
    const {
      label,
      placeholder,
      errors,
      onChange,
      multi,
      readonly,
      isDirty,
      initialValue,
      isValid,
      verify,
      ...props
    } = this.props;
    return (
      <Input
        ref={this.setInput}
        type={this.getType()}
        label={label}
        multiline={multi}
        onKeyPress={multi ? undefined : this.handleKeyPress}
        disabled={readonly}
        onChange={this.onChange}
        {...props}
        error={errors && errors.size > 0 && errors.first()}
      />
    );
  }
  onRegularChange = (value: any) => {
    const { name, onChange = noop } = this.props;
    onChange({ value, name });
  };
}

export default TextInput;
