// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import Input from 'react-toolbox/lib/input';

const noop = ()=>{}
type $props = {
	name: string;
	errors?: Map<string, string>;
	onChange: ()=>void;
  value?: any;
  email?: boolean;
  tel?: boolean;
  label?: string;
  placeholder?: string;
  multi?: boolean;
  readonly?: boolean;
  onEnter?: Function;
  isDirty?: boolean;
  initialValue?: any;
  isValid?: boolean;
  verify?: Function;
  onKeyPress?: Function;
};

export class TextInput extends PureComponent {
  props: $props;
  input: any;
  shouldComponentUpdate(nextProps: $props) {
    return (this.props.value !== nextProps.value || this.props.errors !== nextProps.errors);
  }
  render() {
    return this.generateContent(this.props);
  }
  getType = () => {
    if (this.props.email) {
      return 'email';
    }
    if (this.props.tel) {
      return 'tel';
    }
  }
  setInput = (input: any)=>{
    this.input = input;
  }
  getInput = ()=>{
    return this.input;
  }
  handleOnEnter = (event: Object) => {
    if (event.key === 'Enter' && this.props.onEnter) {
      return this.props.onEnter(event.target.value)
    }
  }
  handleKeyPress = (event: Object) => {
    if (this.props.onEnter) {
      this.handleOnEnter(event);
    }
    this.props.onKeyPress && this.props.onKeyPress(event);
  }
  generateContent = (combinedProps: $props) => {
    const { label, placeholder, errors, onChange, multi, readonly, isDirty, initialValue, isValid, verify, ...props } = combinedProps;
    return (<Input
      ref={this.setInput}
      type={this.getType()}
      label={label}
      multiline={multi}
      onKeyPress={multi ? undefined : this.handleKeyPress}
      disabled={readonly}
      onChange={this.onChange}
      {...props}
      error={errors && errors.size > 0 && errors.first()}
    />);
  }
  onChange = (value: any) => {
    const { name, onChange = noop } = this.props;
    onChange({ value, name });
  }
}

export default TextInput;
