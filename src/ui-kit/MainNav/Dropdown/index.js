// @flow
import React, { PureComponent } from 'react';
import { Menu } from 'react-toolbox/lib/menu';
import classnames from 'classnames';
import Button from '../../Button';
import Micon from '../../Micon';
import Clickable from '../../Clickable';
import { style, icon as iconStyle } from './style.pcss';

type $props = {
  children?: any;
  icon?: any;
  caption?: string;
}

export class MainNavDropdown extends PureComponent {
  props: $props;
  state = {
    active: false,
  }
  toggleActiveOn = () => {
    this.setState({
      active: true,
    });
  }
  toggleActiveOff = () => {
    this.setState(()=>({
      active: false,
    }));
  }
  render() {
    const { icon, caption, children } = this.props;
    return (
      <div className={classnames('menu-dropdown', style)}>
        {
          caption ? <Button onClick={this.toggleActiveOn}>{caption}</Button> :
          <Clickable onClick={this.toggleActiveOn}><span className={iconStyle}>
            <Micon value={icon} /></span>
          </Clickable>
        }
        <span onClick={this.toggleActiveOff}>
          <Menu
            onHide={this.toggleActiveOff}
            active={this.state.active}
            position="topRight"
            menuRipple
          >
            {
              children
            }
          </Menu>
        </span>
      </div>
    );
  }
}
