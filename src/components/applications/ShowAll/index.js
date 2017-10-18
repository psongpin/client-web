// @flow
import React, { PureComponent } from 'react';
import { UL, Row, Column, TextInput } from 'ui-kit';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { List } from 'immutable';
import { createStructuredSelector, createSelector } from 'reselect';
import khange, { kheck } from 'khange';
import pageApplicationSelectors from '@client/selectors/pages/applications';
import applicationSelectors from '@client/selectors/applications';
import internshipSelectors from '@client/selectors/internships';
import pageApplicationActions from '@client/actions/pages/applications';
import internshipActions from '@client/actions/internships';
import projectActions from '@client/actions/projects';
import { textInput } from './style.pcss';
import ApplicationListItem from '../ListItem';

type $props = Object;

export class ApplicationsIndex extends PureComponent {
  props: $props;
  componentWillMount() {
    this.props.getApplications();
  }
  render() {
    const { props } = this;
    return (<div>
      <p>Applications</p>
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
              (props.applicationIds).map((id)=>{
                return <ApplicationListItem id={id} key={id} />;
              })
            }
          </UL>
        </Column>
      </Row>
    </div>);
  }
}

const getApplicationIds = pageApplicationSelectors.getRelatedIds('applications');

const getInternshipIds = createSelector([
  getApplicationIds,
  applicationSelectors.findMonoRelationshipData('internship'),
],
(applicationIds, mapOfInternshipIds) => {
  return applicationIds.map(id => mapOfInternshipIds.get(`${id}`));
});

const getProjectIds = createSelector([
  getInternshipIds,
  internshipSelectors.findMonoRelationshipData('project'),
], (internshipIds, mapOfProjectIds)=>{
  return internshipIds.map(id => mapOfProjectIds.get(`${id}`));
});

const mapStateToProps = createStructuredSelector({
  applicationIds: getApplicationIds,
  internshipIds: getInternshipIds,
  projectIds: getProjectIds,
});

const mapDispatchToProps = (dispatch: $$dispatch)=>({
  getApplications() {
    return dispatch(pageApplicationActions.getApplications());
  },
  indexInternships(ids) {
    return dispatch(internshipActions.index(ids));
  },
  indexProjects(ids) {
    return dispatch(projectActions.index(ids));
  },
});

const onInternshipIdsChange = (props)=>{
  return props.indexInternships(props.internshipIds)
  .then(internships => {
    return props.indexProjects(new List(internships.map(i => i.projectId)));
  })
}

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange([
    [kheck('internshipIds'), onInternshipIdsChange],
  ]),
])(ApplicationsIndex);

