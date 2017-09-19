// @flow

import * as RTCard from 'react-toolbox/lib/card';
import React, { PureComponent } from 'react';

export default class CardText extends PureComponent {
  render() {
    return <RTCard.CardText {...this.props} />;
  }
}
