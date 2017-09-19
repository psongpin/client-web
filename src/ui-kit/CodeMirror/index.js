// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import 'codemirror/lib/codemirror.css';
import ErrorWrapper from '../ErrorWrapper';
import './styleCodeMirror.css';
import RawMarkdownEditor from './RawMarkdownEditor';

type $propTypes = {
	name: string;
	label?: string;
	errors?: Map<string, string>;
	onChange: ()=>void;
	multi?: boolean;
	value: any;
	options?: Object;
	height?: number;
  maxCharacters?: number;
};

export default class CodeMirror extends PureComponent {
  props: $propTypes;
  render() {
    const { label, errors, onChange, multi, value, height, name, options = {}, maxCharacters, ...props } = this.props;
    return (<div>
      <RawMarkdownEditor
        onChange={onChange}
        name={name}
        value={value}
        options={options}
      />
      {errors && errors.size > 0 && <ErrorWrapper>{errors.first()}</ErrorWrapper>}
      {maxCharacters && <div>{`Remaining Characters: ${maxCharacters - value.length}`}</div> }
    </div>);
  }
}
