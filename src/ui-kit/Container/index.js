// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import { container, sidebar, mainContent, menubar } from './style.pcss';


class Container extends PureComponent {
  render() {
    const klass = classnames(
			container,
      {
        [sidebar]: this.props.sidebar,
        [mainContent]: this.props.mainContent,
        [menubar]: this.props.menubar,
        [this.props.className]: this.props.className,
      },
		);
    return (<div className={klass}>
      {this.props.children}
    </div>);
  }
}

export { Container };
