// @flow
import React, { PureComponent } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, Column, Row, Tabs, Tab } from 'ui-kit';
import InternsGrid from 'components/interns/Grid';
import userActions from '@client/actions/users';
import internshipActions from '@client/actions/internships';
import applicationActions from '@client/actions/applications';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import Internship from '@client/models/Internship';
import { container } from './style.pcss';


type $stateProps = {
  id: $$id,
  internship: Internship,
};

type $dispatchProps = {
  find: (id: $$id)=>void;
  goToApplicants: Function;
  getInterns: Function;
  getUsers: Function;
  getFinishedInterns: Function;
};

type $props = $stateProps & $dispatchProps;

export class ShowInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<View className={container}>
      <Row>
        <Column xs={12} size={4}>
          { this.props.children }
        </Column>
        {
          <Column xs={12} size={8}>
            <Tabs>
              <Tab label="CURRENT INTERNS"><InternsGrid owner={props.canEdit} ids={props.currentInternIds}/></Tab>
              <Tab label="FINISHED INTERNSHIPS"><InternsGrid owner={props.canEdit} ids={props.finishedInternIds}/></Tab>
            </Tabs>
          </Column>
        }
      </Row>
    </View>);
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;
const getProjectId = internshipSelectors.findRelatedId('project', getInternshipId);
const getUserId = projectSelectors.findRelatedId('user', getProjectId);

const canEdit = createSelector([
  getUserId,
  sessionSelectors.getCurrentUserId(),
], (userId, currentUserId)=>{
  return userId === currentUserId;
});

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: getInternshipId,
  internship: internshipSelectors.find(getInternshipId),
  currentInternIds: internshipSelectors.getRelatedIds('interns', getInternshipId),
  finishedInternIds: internshipSelectors.getRelatedIds('finishedInterns', getInternshipId),
  project: projectSelectors.find(getProjectId),
  userId: getUserId,
  currentUserId: sessionSelectors.getCurrentUserId(),
  canEdit,
});

export const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(internshipActions.get(id));
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
  };
};

export const onIdChange = ({
  id, find, getInterns, getUsers, getFinishedInterns,
}: $props) => {
  find(id);
  getInterns(id).then(interns => {
    getUsers(new List(interns.map(i => i.userId)));
  });
  getFinishedInterns(id).then(interns => {
    getUsers(new List(interns.map(i => i.userId)));
  });
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange([
    [kheck('id'), onIdChange],
  ]),
])(ShowInternship);
