// @flow
import React, { PureComponent } from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import projectActions from '@client/actions/projects';
import CreateGridCard from 'components/shared/GridCardCreate';

export class CreateProject extends PureComponent {
  render() {
    return (
      <CreateGridCard
        description="All internships require a parent project"
        onClick={this.props.createProject}
      />
    );
  }
}

export const mapDispatchToProps = (dispatch: $$dispatch) => {
  return {
    createProject: () => {
      return dispatch(projectActions.create()).then(id => {
        return dispatch(projectActions.goTo(id));
      });
    },
  };
};

export default flowRight([connect(null, mapDispatchToProps)])(CreateProject);
