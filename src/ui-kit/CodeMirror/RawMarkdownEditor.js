// @flow
import React, { PureComponent } from 'react';
// $FlowFixMe
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/src/css/simplemde.css';

type $props = {
	name: string;
	onChange: Function;
	value: any;
	options?: Object;
};

export default class RawMarkdownEditor extends PureComponent {
  props: $props;
  shouldComponentUpdate(nextProps: $props) {
    if (nextProps.value) {
      return false;
    }
    return true;
  }
  render() {
    const { value, options = {} } = this.props;
    return (
      <SimpleMDE
        onChange={this.onChange}
        value={value}
        options={{
          autofocus: true,
          spellChecker: false,
          ...options,
        }}
      />
    );
  }
  onChange = (value: string) => {
    const { onChange, name } = this.props;
    onChange({ value, name });
  }
}
