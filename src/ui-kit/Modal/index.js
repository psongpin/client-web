// @flow
import React, { PureComponent } from 'react';
import Dialog from 'react-toolbox/lib/dialog';

type $props = {
  isOpen: boolean;
  onClose?: Function;
  children?: any;
  size?: 'sm' | 'md' | 'lg';
  actions?: Object[];
  title: string;
  noClose?: boolean;
}

const sizes = {
  sm: '300px',
  md: '500px',
  lg: '900px',
};

export default class Modal extends PureComponent {
  props: $props;
  render() {
    const { noClose, onClose, isOpen, size, actions, title } = this.props;
    return (
      <Dialog
        style={{
          maxWidth: size ? sizes[size] : sizes.md,
        }}
        actions={actions}
        active={isOpen}
        onEscKeyDown={noClose ? onClose : undefined}
        onOverlayClick={noClose ? onClose : undefined}
        title={title}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
