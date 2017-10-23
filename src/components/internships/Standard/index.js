// @flow
import React, { PureComponent } from 'react';
import { Clickable } from 'ui-kit';

export default class StandardInternship extends PureComponent {
  goToStandardInternship = () => {
    window.open('https://github.com/Menternship/overview/blob/master/officialInternships.md');
  }
  render() {
    return <Clickable onClick={this.goToStandardInternship}>Standard Internship</Clickable>;
  }
}
