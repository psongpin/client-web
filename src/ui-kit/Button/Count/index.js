// @flow
import React from 'react';
import classnames from 'classnames';
import { nonButton } from './style.pcss';
import { Icon } from '../../Icon';
import Button from '../';

const noop = () => {};

type $props = {
  total: number,
  mine?: boolean,
  onAdd?: Function,
  onRemove?: Function,
  myIconName?: string,
  iconName?: string,
  readonly?: boolean,
  button?: boolean,
  buttonName?: string,
  className?: string,
};
export default (props: $props) => {
  const {
    className,
    total,
    mine,
    myIconName,
    iconName,
    onRemove,
    onAdd,
    readonly,
    button,
    buttonName = '',
  } = props;
  const onClick = mine ? onRemove : onAdd;
  const Tag = button && !readonly ? Button : 'span';
  return (
    <Tag
      className={classnames(
        {
          [nonButton]: readonly,
        },
        className
      )}
      ripple={!readonly}
      onClick={readonly ? noop : onClick}
      flat={readonly}
    >
      <Icon name={mine ? myIconName : iconName} />
      {`${button ? ` ${buttonName} | ` : ''}${Number(total || 0) +
        Number(!!mine)}`}
    </Tag>
  );
};
