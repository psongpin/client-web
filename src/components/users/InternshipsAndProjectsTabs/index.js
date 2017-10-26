// @flow
import React, { PureComponent } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Tabs, Tab } from 'ui-kit';
import InternInternshipGrid from 'components/interns/InternshipGrid';
import ProjectGrid from 'components/projects/Grid';
import userActions from '@client/actions/users';
import internshipActions from '@client/actions/internships';
import projectActions from '@client/actions/projects';
import userSelectors from '@client/selectors/users';

type $stateProps = {
  id: $$id,
};

type $dispatchProps = {
  getInternsByUser: () => Promise<any>,
  getProjectsByUser: () => void,
  indexInternships: Function,
  indexProjects: Function,
};

type $props = $stateProps & $dispatchProps;

export class UserInternshipsAndProjectsTabs extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <Tabs>
        <Tab label="INTERNSHIPS">
          <InternInternshipGrid owner={props.owner} ids={props.internIds} />
        </Tab>
        <Tab label="PROJECTS">
          <ProjectGrid create={props.owner} ids={props.projectIds} />
        </Tab>
      </Tabs>
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  userId: userSelectors.getUserId,
  internIds: userSelectors.getRelatedIds('interns', userSelectors.getUserId),
  projectIds: userSelectors.getRelatedIds('projects', userSelectors.getUserId),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: Object
): $Exact<$dispatchProps> => {
  return {
    getInternsByUser() {
      return dispatch(userActions.getInterns(props.userId));
    },
    getProjectsByUser() {
      dispatch(userActions.getProjects(props.userId));
    },
    indexInternships(ids) {
      return dispatch(internshipActions.index(ids));
    },
    indexProjects(ids) {
      return dispatch(projectActions.index(ids));
    },
  };
};

export const onIdChange = (props: $props) => {
  props
    .getInternsByUser()
    .then(interns => {
      return props.indexInternships(new List(interns.map(i => i.internshipId)));
    })
    .then(internships => {
      return props.indexProjects(new List(internships.map(i => i.projectId)));
    });
  props.getProjectsByUser();
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange(kheck('id'), onIdChange),
])(UserInternshipsAndProjectsTabs);
