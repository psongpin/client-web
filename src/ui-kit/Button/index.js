// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button as UIButton } from 'react-toolbox/lib/button';
import Modal from '../Modal';
import { buttonWrapper } from './style.pcss';

type $props = {
  onClick?: Function,
  onConfirmClick?: Function,
  styleType?: string,
  children?: string,
  confirmationMessage?: string,
  iconName?: string,
  flat?: boolean,
  disabled?: boolean | (() => boolean),
};

export class Button extends PureComponent {
  props: $props;
  state = {
    modal: false,
  };
  static contextTypes = {
    color: PropTypes.string,
  };
  toggleModal = (e?: Event) => {
    if (e) e.stopPropagation();
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleFinalClick = (e?: Event) => {
    if (e) e.stopPropagation();
    const { onConfirmClick, onClick } = this.props;
    if (onConfirmClick) {
      onConfirmClick();
    } else {
      // $FlowFixMe
      onClick();
    }
  };
  confirm = () => {
    this.handleFinalClick();
    this.toggleModal();
  };

  render = () => {
    const {
      children,
      confirmationMessage,
      iconName,
      disabled: predisabled,
      ...props
    } = this.props;
    const disabled =
      typeof predisabled === 'function' ? predisabled() : predisabled;
    if (confirmationMessage) {
      return (
        <div className={buttonWrapper}>
          <Modal
            isOpen={this.state.modal}
            onClose={this.toggleModal}
            actions={[
              { label: 'Cancel', onClick: this.toggleModal },
              { label: 'Confirm', onClick: this.confirm },
            ]}
            title="Confirmation"
          >
            <p>{confirmationMessage}</p>
          </Modal>
          <UIButton
            onClick={this.toggleModal}
            icon={iconName}
            raised={!props.floating}
            disabled={disabled}
            {...props}
          >
            {children}
          </UIButton>
        </div>
      );
    }
    return (
      <UIButton
        onClick={this.handleFinalClick}
        icon={iconName}
        raised={!props.flat && !props.floating}
        disabled={disabled}
        {...props}
      >
        {children}
      </UIButton>
    );
  };
}

export default Button;
