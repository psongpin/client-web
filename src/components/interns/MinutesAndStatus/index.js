// @flow
import React, { PureComponent } from 'react';
import { CardText } from 'ui-kit';
import { displayStatusTypes } from '@client/models/Intern';

export default class extends PureComponent {
  render() {
    const { props } = this;
    return (<CardText>
      <p>{displayStatusTypes[props.intern.status]}</p>
      <p>{`Total Hours: ${Math.round(props.intern.minutes / 60, 2)} / 40 (${Math.round(100 * (props.intern.minutes / 2400), 2)}%)`}</p>
    </CardText>);
  }
}
