// @flow
import React, { PureComponent } from 'react';
import { UL, Row, Column, TextInput } from 'ui-kit';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import { textInput } from './style.pcss';
import ApplicantListItem from '../ListItem';

export class ApplicantsShowAll extends PureComponent {
  render() {
    const { props } = this;
    return (<div>
      <h1>
        { props.internship.name }
      </h1>
      <h2>
        { props.project.name }
      </h2>
      <Row>
        <Column>
          <TextInput className={textInput} label="Search" />
        </Column>
      </Row>
      <Row>
        <Column>
          <UL>
            {
              ([1] || props.applicantIds).map((id)=>{
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
const getProjectId = internshipSelectors.findRelatedId('project', getInternshipId);

const mapStateToProps = createStructuredSelector({
  internship: internshipSelectors.find(getInternshipId),
  project: projectSelectors.find(getProjectId),
  applicantIds: internshipSelectors.getRelatedIds('applicants'),
});

export default flowRight([
  connect(mapStateToProps),
])(ApplicantsShowAll);

