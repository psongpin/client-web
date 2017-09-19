// @flow

import * as RTCard from 'react-toolbox/lib/card';
import React, { PureComponent } from 'react';

export default class Card extends PureComponent {
  render() {
    return <RTCard.Card {...this.props} />;
  }
}
