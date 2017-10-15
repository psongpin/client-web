// @flow
import React, { PureComponent } from 'react';
import ULItem from 'components/shared/AppULItem';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import applicationSelectors from '@client/selectors/applications';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';

import { status } from './style.pcss';

export class ApplicationListItem extends PureComponent {
  render() {
    const { props } = this;
    return (<ULItem
      legend={props.project.name}
      rightIcon={<span className={status}>{props.application.displayStatus()}</span>}
    >
      {
        props.internship.name
      }
    </ULItem>);
  }
}

const mapStateToPropsFactory = ()=>{
  const getInternshipId = applicationSelectors.findRelatedId('internship');
  const getProjectId = internshipSelectors.findRelatedId('project');
  return createStructuredSelector({
    application: applicationSelectors.find(),
    internship: internshipSelectors.find(getInternshipId),
    project: projectSelectors.find(getProjectId),
  });
};

export default flowRight([
  connect(mapStateToPropsFactory),
])(ApplicationListItem);
