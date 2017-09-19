// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import CodeMirror from '../';

export default class LinkedCodeMirror extends PureComponent {
  props: {
		field: Map<string, any>;
    noLabel?: boolean;
	}
  render() {
    const { field, noLabel, ...otherProps } = this.props;
    const { name, onChange, label, value, errors } = field.toObject();
    const combinedProps = { name, onChange, label: !noLabel ? label : undefined, value, errors, ...otherProps };
    return <CodeMirror {...combinedProps} />;
  }
}
