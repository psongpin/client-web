// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
export class Icon extends PureComponent {
  render() {
    const { name, className, md, ...props } = this.props;
    if (md) {
      return <i className="material-icons">{name}</i>;
    }
    const klass = classnames('fa', `fa-${name}`, className);
    return <i className={klass} {...props} />;
  }
}
