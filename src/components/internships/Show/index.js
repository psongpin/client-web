// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import moment from 'moment';
import {
  Markdown,
  Button,
  CardText,
  CardActions,
  Card,
  CardTitle,
} from 'ui-kit';
import projectActions from '@client/actions/projects';
import internshipActions from '@client/actions/internships';
import applicationActions from '@client/actions/applications';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import applicationSelectors from '@client/selectors/applications';
import Project from '@client/models/Project';
import Internship, {
  statusTypes,
  statusLabels,
} from '@client/models/Internship';
import GoToProject from 'components/projects/GoTo';
import LocationRemote from '../LocationRemote';

type $stateProps = {
  id: $$id,
  internship: Internship,
  currentUserId: $$id,
  projectId: $$id,
  canEdit: boolean,
  alreadyApplied: boolean,
  internExists: boolean,
  loggedIn: boolean,
  userId: $$id,
  project: Project,
};

type $dispatchProps = {
  goToApplicants: Function,
  goToEdit: Function,
  apply: Function,
  getApplications: Function,
  deleteInternship: Function,
};

type $props = $stateProps & $dispatchProps;

export class ShowInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <Card>
        <CardTitle
          title={props.internship.name}
          subtitle={<GoToProject id={props.projectId} />}
        />
        {props.internship.status === statusTypes.INACTIVE && (
          <CardText>
            <p>{statusLabels[props.internship.status]}</p>
          </CardText>
        )}
        <CardText>
          <p>{moment(props.internship.postedAt).fromNow()}</p>
        </CardText>
        <LocationRemote internship={props.internship} />
        <CardText>
          <Markdown content={props.internship.description} />
        </CardText>
        <CardActions>
          {props.canEdit && [
            <Button onClick={props.goToApplicants}>Applicants</Button>,
            <Button onClick={props.goToEdit}>Edit</Button>,
          ]}
          {props.canEdit &&
            !props.internExists && (
              <Button
                confirmationMessage="Are you sure you want to delete this internship?"
                onConfirmClick={props.deleteInternship}
              >
                Delete
              </Button>
            )}
          {!props.canEdit &&
            props.loggedIn &&
            !props.alreadyApplied && [
              <Button onClick={props.apply}>Apply</Button>,
            ]}
        </CardActions>
        {props.alreadyApplied && (
          <CardText>
            <span>Applied</span>
          </CardText>
        )}
        <CardText>
          <h3>{`About ${props.project.name}:`}</h3>
          <Markdown content={props.project.description} />
        </CardText>
      </Card>
    );
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;
const getProjectId = internshipSelectors.findRelatedId(
  'project',
  getInternshipId
);
const getUserId = projectSelectors.findRelatedId('user', getProjectId);
const alreadyApplied = createSelector(
  [
    internshipSelectors.getRelatedIds('applications', getInternshipId),
    applicationSelectors.findMonoRelationshipData('user'),
    sessionSelectors.getCurrentUserId(),
  ],
  (applicationIds, applicationUserRelationshipData, currentUserId) => {
    if (!currentUserId) return false;
    return applicationIds.reduce((finalResult, applicationId) => {
      if (finalResult) return finalResult;
      return (
        Number(applicationUserRelationshipData.get(`${applicationId}`)) ===
        Number(currentUserId)
      );
    }, false);
  }
);

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getInternshipId,
  currentUserId: sessionSelectors.getCurrentUserId(),
  loggedIn: sessionSelectors.isLoggedIn(),
  projectId: getProjectId,
  project: projectSelectors.find(getProjectId),
  internship: internshipSelectors.find(getInternshipId),
  userId: getUserId,
  alreadyApplied,
  canEdit: internshipSelectors.canEdit(getInternshipId),
  internExists: internshipSelectors.internExists(getInternshipId),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> => {
  return {
    goToApplicants() {
      dispatch(applicationActions.goToApplicants(props.id));
    },
    goToEdit() {
      dispatch(internshipActions.goToEdit(props.id));
    },
    apply() {
      dispatch(
        applicationActions.create(
          {
            internshipId: props.id,
          },
          props.currentUserId
        )
      );
    },
    getApplications() {
      dispatch(internshipActions.getApplications(props.id));
    },
    deleteInternship() {
      return dispatch(internshipActions.del(props.id)).then(() => {
        return dispatch(projectActions.goTo(props.projectId));
      });
    },
  };
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
])(ShowInternship);
