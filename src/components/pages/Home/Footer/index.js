// @flow
import React, { PureComponent } from 'react';
import { Row, Column } from 'ui-kit';
import { style, ul, li } from './style.pcss';

const links = [
  {
    name: 'About',
    href: 'https://github.com/menternship/overview',
  },
  {
    name: 'Terms of Service',
    href:
      'https://github.com/Menternship/overview/blob/master/termsOfService.md',
  },
];

export default class Footer extends PureComponent {
  render() {
    return (
      <Row className={style} center="xs">
        <Column>
          <ul className={ul}>
            {links.map(link => (
              <li key={link.name} className={li}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </Column>
      </Row>
    );
  }
}
