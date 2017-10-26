// @flow
import React from 'react';

type $props = {
  children?: any,
  className?: string,
  size?: 'sm' | 'md' | 'lg',
};

function getTag(size) {
  switch (size) {
    case 'sm':
      return 'h3';
    case 'md':
      return 'h2';
    default:
      return 'h1';
  }
}

export const Header = (props: $props) => {
  const { className, children, size } = props;
  const Tag = getTag(size);
  return <Tag className={className}>{children}</Tag>;
};
