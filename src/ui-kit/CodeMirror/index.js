// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import 'codemirror/lib/codemirror.css';
import ErrorWrapper from '../ErrorWrapper';
import './styleCodeMirror.css';
import RawMarkdownEditor from './RawMarkdownEditor';

type $props = {
  name: string,
  errors?: Map<string, string>,
  onChange: () => void,
  value: any,
  options?: Object,
  maxCharacters?: number,
};

export default class CodeMirror extends PureComponent {
  props: $props;
  render() {
    const {
      errors,
      onChange,
      value,
      name,
      options = {},
      maxCharacters,
    } = this.props;
    return (
      <div>
        <RawMarkdownEditor
          onChange={onChange}
          name={name}
          value={value}
          options={options}
        />
        {errors &&
          errors.size > 0 && <ErrorWrapper>{errors.first()}</ErrorWrapper>}
        {maxCharacters && (
          <div>{`Remaining Characters: ${maxCharacters - value.length}`}</div>
        )}
      </div>
    );
  }
}
