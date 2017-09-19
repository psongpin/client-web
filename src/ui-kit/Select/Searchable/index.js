// @flow
import ReactSelect from 'react-select';
import { List } from 'immutable';
import { debounce } from 'lodash';
import React, { PureComponent } from 'react';
import InputLabel from '../../InputLabel';

type $option = {
	value: any;
	label: string;
};

type $props = {
	className?: string;
	onChange: (value: any) => any;
	value: any;
	label?: string;
  name?: string;
  onSearch: (value: any) => any;
  defaultOptions: Array<any>;
};

export default class Select extends PureComponent {
  props: $props;
  state = {
    active: false,
    options: [],
  }
  debounceInputChange: Function;
  constructor(props: $props) {
    super(props);
    this.state.options = props.defaultOptions;
    this.debounceInputChange = debounce(this.onInputChange, 333);
  }
  onInputChange = (value: any)=>{
    if (value) {
      // this.setState({
      //   active: true,
      // });
      this.props.onSearch(value)
      .then((options)=>{
        this.setState({
          options,
          // active: false,
        });
      });
    }
  }
  onChange = (values: Object) => {
    this.props.onChange({
      name: this.props.name,
      value: values.map(o => o.value),
    });
  }
  render() {
    const { className, value, onChange, label, ...props } = this.props;
    return (<div>
      {label && <InputLabel>{label}</InputLabel>}
      <ReactSelect
        onInputChange={this.debounceInputChange}
        isLoadingExternally={this.state.active}
        className={className}
        options={this.state.options}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>);
  }
}
