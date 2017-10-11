// @flow
import React, { PureComponent } from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import internshipActions from '@client/actions/internships';
import CreateGridCard from 'components/shared/GridCardCreate';
import store from '../../../configureStore'

export class CreateInternship extends PureComponent {
  render() {
    console.log(store.getState().erschema.relationships.projects.internships.get('2'))
    return <CreateGridCard onClick={this.props.create} />;
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch, props: Object)=>{
  return {
    create: ()=>{
      return dispatch(internshipActions.create({ projectId: props.projectId }))
      .then((id)=>{
        return dispatch(internshipActions.goTo(id));
      });
    },
  };
};

export default flowRight([
  connect(null, mapDispatchToProps),
])(CreateInternship);
