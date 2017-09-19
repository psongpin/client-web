// @flow
import * as RTCard from 'react-toolbox/lib/card';
import React, { PureComponent } from 'react';

export default class CardActions extends PureComponent {
  render() {
    return <RTCard.CardActions {...this.props} />;
  }
}
