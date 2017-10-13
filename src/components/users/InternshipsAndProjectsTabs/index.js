// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Tabs, Tab } from 'ui-kit';
import InternshipGrid from 'components/internships/Grid';
import ProjectGrid from 'components/projects/Grid';
import userActions from '@client/actions/users';
import userSelectors from '@client/selectors/users';

type $stateProps = {
  id: $$id,
};

type $dispatchProps = {
  getInternshipsByUser: ()=>void;
  getProjectsByUser: ()=>void;
};

type $props = $stateProps & $dispatchProps;

export class UserInternshipsAndProjectsTabs extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<Tabs>
      <Tab label="INTERNSHIPS"><InternshipGrid ids={props.internshipIds}/></Tab>
      <Tab label="PROJECTS"><ProjectGrid create={props.canEdit ? true : false} ids={props.projectIds}/></Tab>
    </Tabs>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  userId: userSelectors.getUserId,
  internshipIds: userSelectors.getRelatedIds('internships', userSelectors.getUserId),
  projectIds: userSelectors.getRelatedIds('projects', userSelectors.getUserId),
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: Object): $Exact<$dispatchProps> => {
  return {
    getInternshipsByUser() {
      dispatch(userActions.getInternships(props.userId));
    },
    getProjectsByUser() {
      dispatch(userActions.getProjects(props.userId));
    },
  };
};

export const onIdChange = (props: $props) => {
  props.getInternshipsByUser();
  props.getProjectsByUser();
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange(kheck('id'), onIdChange),
])(UserInternshipsAndProjectsTabs);
