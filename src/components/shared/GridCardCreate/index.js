// @flow
import React, { PureComponent } from 'react';
import { Clickable, CardText } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { plus, description } from './style.pcss';

export default class CreateGridCard extends PureComponent {
  render() {
    return (
      <GridCard>
        <CardText>
          <Clickable onClick={this.props.onClick} className={plus}>
            <span>+</span>
            <p className={description}>{this.props.description}</p>
          </Clickable>
        </CardText>
      </GridCard>
    );
  }
}
