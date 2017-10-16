// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Button, CardText, CardActions, Card, CardTitle } from 'ui-kit';
import projectActions from '@client/actions/projects';
import internshipActions from '@client/actions/internships';
import applicationActions from '@client/actions/applications';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import applicationSelectors from '@client/selectors/applications';
import Internship from '@client/models/Internship';


type $stateProps = {
  id: $$id,
  internship: Internship,
  currentUserId: $$id,
  projectId: $$id,
};

type $dispatchProps = {
  find: (id: $$id)=>void;
  goToApplicants: Function;
  goToEdit: Function;
  findProject: Function;
  apply: Function;
  getApplications: Function;
};

type $props = $stateProps & $dispatchProps;

export class ShowInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<Card>
      <CardTitle
        title={props.internship.name}
      />
      <CardText>
        {props.internship.description}
      </CardText>
      <CardActions>
        {
          props.canEdit && ([
            <Button onClick={props.goToApplicants}>
              Applicants
            </Button>,
            <Button onClick={props.goToEdit}>
              Edit
            </Button>,
          ])
        }
        {
          !props.canEdit && props.loggedIn && !props.alreadyApplied && [
            <Button onClick={props.apply}>Apply</Button>,
          ]
        }
        {
          props.alreadyApplied && <span>Applied</span>
        }
      </CardActions>
    </Card>);
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;
const getProjectId = internshipSelectors.findRelatedId('project', getInternshipId);
const getUserId = projectSelectors.findRelatedId('user', getProjectId);
const alreadyApplied = createSelector([
  internshipSelectors.getRelatedIds('applications', getInternshipId),
  applicationSelectors.findMonoRelationshipData('user'),
  sessionSelectors.getCurrentUserId(),
],
(applicationIds, applicationUserRelationshipData, currentUserId)=>{
  if (!currentUserId) return false;
  return applicationIds.reduce((finalResult, applicationId) => {
    if (finalResult) return finalResult;
    return Number(applicationUserRelationshipData.get(`${applicationId}`)) === Number(currentUserId);
  }, false);
});
const canEdit = createSelector([
  getUserId,
  sessionSelectors.getCurrentUserId(),
],
(userId, currentUserId)=>{
  return userId === currentUserId;
});
export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: getInternshipId,
  currentUserId: sessionSelectors.getCurrentUserId(),
  loggedIn: sessionSelectors.isLoggedIn(),
  projectId: getProjectId,
  internship: internshipSelectors.find(getInternshipId),
  currentInternIds: internshipSelectors.getRelatedIds('interns', getInternshipId),
  completedInternshipIds: internshipSelectors.getRelatedIds('completedInternships', getInternshipId),
  project: projectSelectors.find(getProjectId),
  userId: getUserId,
  canEdit,
  alreadyApplied,
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(internshipActions.get(id));
    },
    findProject(id) {
      if (id) dispatch(projectActions.get(id));
    },
    goToApplicants() {
      dispatch(applicationActions.goToApplicants(props.id));
    },
    goToEdit() {
      dispatch(internshipActions.goToEdit(props.id));
    },
    apply() {
      dispatch(applicationActions.create({
        internshipId: props.id,
      }, props.currentUserId));
    },
    getApplications() {
      dispatch(internshipActions.getApplications(props.id));
    },
  };
};

export const onIdChange = ({
  id, find, getApplications,
}: $props) => {
  find(id);
  getApplications(id);
};

export const onProjectIdChange = ({
  projectId, findProject,
}: $props) => {
  findProject(projectId);
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange([
    [kheck('id'), onIdChange],
    [kheck('projectId'), onProjectIdChange],
  ]),
])(ShowInternship);
