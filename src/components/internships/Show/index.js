// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Button, CardText, CardActions, Card, CardTitle } from 'ui-kit';
import projectActions from '@client/actions/projects';
import internshipActions from '@client/actions/internships';
import applicantActions from '@client/actions/applications';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import Internship from '@client/models/Internship';


type $stateProps = {
  id: $$id,
  internship: Internship,
};

type $dispatchProps = {
  find: (id: $$id)=>void;
  goToApplicants: Function;
  goToEdit: Function;
  findProject: Function;
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
      {
        props.canEdit && (<CardActions>
          <Button onClick={props.goToApplicants}>
            Applicants
          </Button>
          <Button onClick={props.goToEdit}>
            Edit
          </Button>
        </CardActions>)
      }
    </Card>);
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;
const getProjectId = internshipSelectors.findRelatedId('project', getInternshipId);
const getUserId = projectSelectors.findRelatedId('user', getProjectId);

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: getInternshipId,
  projectId: getProjectId,
  internship: internshipSelectors.find(getInternshipId),
  currentInternIds: internshipSelectors.getRelatedIds('interns', getInternshipId),
  completedInternshipIds: internshipSelectors.getRelatedIds('completedInternships', getInternshipId),
  project: projectSelectors.find(getProjectId),
  userId: getUserId,
  canEdit: createSelector([
    getUserId,
    sessionSelectors.getCurrentUserId(),
    getProjectId
  ],
  (userId, currentUserId, p)=>{
    console.log(userId, currentUserId, p);
    return userId === currentUserId;
  }),
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
  };
};

export const onIdChange = ({
  id, find,
}: $props) => {
  find(id);
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
