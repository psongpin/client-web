// @flow
import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import 'codemirror/lib/codemirror.css';
import '../styleCodeMirror.css';
import RawMarkdownEditor from '../RawMarkdownEditor';
import Button from '../../Button';
import Markdown from '../../Markdown';
import Column from '../../Grid/Column';
import Row from '../../Grid/Row';
import Grid from '../../Grid';

type $propTypes = {
	name: string;
	label?: string;
	errors?: Map<string, string>;
	onChange: ()=>void;
	multi?: boolean;
	value: any;
	options?: Object;
	height?: number;
};

export default class CodeMirror extends PureComponent {
  props: $propTypes;
  state = {
    preview: false,
  }
  render() {
    const { label, errors, onChange, multi, value, height, name, options = {}, ...props } = this.props;
    return (<Grid>
      <Row style={height ? { height: `${height}px` } : {}}>
        <Column size={6} >
          <RawMarkdownEditor
            onChange={onChange}
            name={name}
            value={value}
            options={options}
          />
        </Column>
        <Column size={6} >
          <Markdown content={value} />
        </Column>
        {errors && errors.size > 0 && <span className="label label-danger">{errors.first()}</span>}
      </Row>
    </Grid>);
  }
  togglePreview = () => {
    this.setState({ preview: !this.state.preview })
  }
}
