// @flow
import React, { PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import './style.css';

type $props = {
  content: string,
};

export default class Markdown extends PureComponent {
  props: $props;
  render() {
    return <ReactMarkdown skipHtml source={this.props.content} />;
  }
}
