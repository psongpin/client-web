// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck, form } from '@client/hoc';
import { Dropdown, Button, CardText, CardActions, Card, CardTitle, TextInput } from 'ui-kit';
import internshipActions from '@client/actions/internships';
import applicationActions from '@client/actions/applications';
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
  goTo: Function;
  updateInternship: Function;
};

type $props = $stateProps & $dispatchProps;

const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 2, label: 'Inactive' },
];

export class EditInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<Card>
      <CardText>
        <TextInput {...props.fields.get('name').toObject()} />
      </CardText>
      <CardText>
        <TextInput multi rows={5} {...props.fields.get('description').toObject()} />
      </CardText>
      <CardText>
        <Dropdown source={statusOptions} {...props.fields.get('status').toObject()} />
      </CardText>
      <CardActions>
        <Button onClick={props.goTo}>
          Go Back
        </Button>
        <Button onClick={props.goToApplicants}>
          Applicants
        </Button>
      </CardActions>
    </Card>);
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;
const getProjectId = internshipSelectors.findRelatedId('project', getInternshipId);
const getUserId = projectSelectors.findRelatedId('user', getProjectId);

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: getInternshipId,
  internship: internshipSelectors.find(getInternshipId),
  currentInternIds: internshipSelectors.getRelatedIds('interns', getInternshipId),
  completedInternshipIds: internshipSelectors.getRelatedIds('completedInternships', getInternshipId),
  project: projectSelectors.find(getProjectId),
  userId: getUserId,
  canEdit: createSelector([
    getUserId,
    sessionSelectors.getCurrentUserId(),
  ],
  (userId, currentUserId)=>userId === currentUserId),
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(internshipActions.get(id));
    },
    goToApplicants() {
      dispatch(applicationActions.goToApplicants(props.id));
    },
    goTo() {
      dispatch(internshipActions.goTo(props.id));
    },
    updateInternship({ name, value }) {
      return dispatch(internshipActions.update(props.id, { [name]: value }))
    },
  };
};

export const onIdChange = ({
  id, find,
}: $props) => {
  find(id);
};

const fieldsSelector = (props)=>{
  return {
    name: {},
    description: {},
    status: {},
  };
};

const actionsSelector = (props)=>{
  return {
    update: props.updateInternship,
  };
};

const configSelector = ()=>({
  initialValuesPropName: 'internship',
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange([
    [kheck('id'), onIdChange],
  ]),
  form(fieldsSelector, actionsSelector, configSelector)
])(EditInternship);
