// @flow
import React, { PureComponent } from 'react';

type $props = {
  children?: any,
  onSubmit: Function,
};

export default class Form extends PureComponent {
  props: $props;
  handleSubmit = (event: Object) => {
    event.preventDefault();
    this.props.onSubmit();
  };
  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}
