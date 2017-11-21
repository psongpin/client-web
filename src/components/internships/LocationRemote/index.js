// @flow
import React from 'react';
import { CardText } from 'ui-kit';
import * as style from './style.pcss';

const Remote = <span className={style.remote}>Remote</span>;

export default class LocationRemote extends React.PureComponent {
  render() {
    const { location, remote } = this.props.internship;
    if (location && remote) {
      return (
        <CardText>
          <p>
            {location} - {Remote}
          </p>
        </CardText>
      );
    }
    if (location) {
      return (
        <CardText>
          <p>{location}</p>
        </CardText>
      );
    }
    if (remote) {
      return (
        <CardText>
          <p>{Remote}</p>
        </CardText>
      );
    }
    return null;
  }
}
