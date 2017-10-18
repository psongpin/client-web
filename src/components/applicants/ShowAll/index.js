// @flow
import React, { PureComponent } from 'react';
import { UL, Row, Column, TextInput } from 'ui-kit';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import khange, { kheck } from 'khange';
import { createStructuredSelector, createSelector } from 'reselect';
import internshipSelectors from '@client/selectors/internships';
import applicationSelectors from '@client/selectors/applications';
import { requestInternshipAndProject } from '@client/utils/internshipUtils';
import userActions from '@client/actions/users';
import internshipActions from '@client/actions/internships';
import { textInput } from './style.pcss';
import ApplicantListItem from '../ListItem';

export class ApplicantsShowAll extends PureComponent {
  render() {
    const { props } = this;
    return (<div>
      <p><strong>
        { props.internship.name }</strong>, { props.project.name }
      </p>
      {
        // <Row>
        //   <Column>
        //     <TextInput className={textInput} label="Search" />
        //   </Column>
        // </Row>
      }
      <Row>
        <Column>
          <UL>
            {
              (props.applicantIds).map((id)=>{
                return <ApplicantListItem id={id} key={id} />;
              })
            }
          </UL>
        </Column>
      </Row>
    </div>);
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;
const getApplicantIds = internshipSelectors.getRelatedIds('applications', getInternshipId);
const getUserIds = createSelector([
  getApplicantIds,
  applicationSelectors.findMonoRelationshipData('user'),
],
(applicationIds, mapOfUserIds)=>{
  return applicationIds.map(id => mapOfUserIds.get(`${id}`));
});

const mapStateToProps = createStructuredSelector({
  id: getInternshipId,
  applicantIds: getApplicantIds,
  userIds: getUserIds,
});

const mapDispatchToProps = (dispatch: $$dispatch) => {
  return {
    getUsers(userIds) {
      dispatch(userActions.getUsers(userIds));
    },
    getApplications(id) {
      if (id) {
        dispatch(internshipActions.getApplications(id));
      }
    },
  };
};

const onInternshipChange = (props) => {
  return props.getApplications(props.id);
};

const onApplicationsChange = (props) => {
  return props.getUsers(props.userIds);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  requestInternshipAndProject(getInternshipId),
  khange([
    [kheck('id'), onInternshipChange],
    [kheck('applicantIds'), onApplicationsChange],
  ]),
])(ApplicantsShowAll);

