// @flow
import React, { PureComponent } from 'react';
import { Clickable, CardText } from 'ui-kit';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import projectActions from '@client/actions/projects';
import GridCard from 'components/shared/GridCard';
import { plus } from './style.pcss';

export class CreateProject extends PureComponent {
  render() {
    return (
      <GridCard>
        <CardText>
          <Clickable onClick={this.props.createProject} className={plus}>
          +
          </Clickable>
        </CardText>
      </GridCard>);
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch)=>{
  return {
    createProject: ()=>{
      return dispatch(projectActions.create())
      .then((id)=>{
        return dispatch(projectActions.goTo(id));
      });
    },
  };
};

export default flowRight([
  connect(null, mapDispatchToProps),
])(CreateProject);
