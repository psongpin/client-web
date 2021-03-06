// @flow
import React, { PureComponent } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, Column, Row, Tabs, Tab } from 'ui-kit';
import InternsGrid from 'components/interns/Grid';
import userActions from '@client/actions/users';
import internshipActions from '@client/actions/internships';
import applicationActions from '@client/actions/applications';
import projectActions from '@client/actions/projects';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import Internship from '@client/models/Internship';
import Project from '@client/models/Project';

type $ownProps = {
  children: any,
};

type $stateProps = {
  id: $$id,
  internship: Internship,
  canEdit: boolean,
  currentInternIds: any,
  finishedInternIds: any,
  project: Project,
  userId: $$id,
  currentUserId: $$id,
  canEdit: boolean,
};

type $dispatchProps = {
  find: (id: $$id) => Promise<any>,
  findProject: Function,
  goToApplicants: Function,
  getInterns: Function,
  getUsers: Function,
  getFinishedInterns: Function,
  getApplications: Function,
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class ShowInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <View>
        <Row>
          <Column xs={12} size={4}>
            {this.props.children}
          </Column>
          {
            <Column xs={12} size={8}>
              <Tabs>
                <Tab label="CURRENT INTERNS">
                  <InternsGrid
                    owner={props.canEdit}
                    ids={props.currentInternIds}
                  />
                </Tab>
                <Tab label="FINISHED INTERNSHIPS">
                  <InternsGrid
                    owner={props.canEdit}
                    ids={props.finishedInternIds}
                  />
                </Tab>
              </Tabs>
            </Column>
          }
        </Row>
      </View>
    );
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getInternshipId,
  internship: internshipSelectors.find(getInternshipId),
  currentInternIds: internshipSelectors.getRelatedIds(
    'interns',
    getInternshipId
  ),
  finishedInternIds: internshipSelectors.getRelatedIds(
    'finishedInterns',
    getInternshipId
  ),
  project: projectSelectors.find(
    internshipSelectors.getProjectId(getInternshipId)
  ),
  userId: internshipSelectors.getUserId(getInternshipId),
  currentUserId: sessionSelectors.getCurrentUserId(),
  canEdit: internshipSelectors.canEdit(getInternshipId),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> => {
  return {
    find(id) {
      return dispatch(internshipActions.get(id));
    },
    findProject(id) {
      return dispatch(projectActions.get(id));
    },
    goToApplicants(id) {
      dispatch(applicationActions.goToApplicants(id));
    },
    getInterns(id) {
      return dispatch(internshipActions.getInterns(id));
    },
    getFinishedInterns(id) {
      return dispatch(internshipActions.getFinishedInterns(id));
    },
    getUsers(ids) {
      return dispatch(userActions.getUsers(ids));
    },
    getApplications(id) {
      return dispatch(internshipActions.getApplications(id));
    },
  };
};

export const onIdChange = ({
  id,
  find,
  findProject,
  getInterns,
  getUsers,
  getFinishedInterns,
  getApplications,
}: $props) => {
  if (id) {
    getApplications(id);
    find(id).then(internship => {
      return findProject(internship.projectId);
    });
    getInterns(id).then(interns => {
      getUsers(new List(interns.map(i => i.userId)));
    });
    getFinishedInterns(id).then(interns => {
      getUsers(new List(interns.map(i => i.userId)));
    });
  }
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange([[kheck('id'), onIdChange]]),
])(ShowInternship);
