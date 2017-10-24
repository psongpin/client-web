// @flow
import React, { PureComponent } from 'react';
import ULItem from 'components/shared/AppULItem';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import * as panelActions from '@client/actions/panels';
import applicationSelectors from '@client/selectors/applications';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import { displayStatus, isOffered } from '@client/models/Application';
import { status } from './style.pcss';

type $props = Object;

export class ApplicationListItem extends PureComponent {
  props: $props;
  handleOpenOffer = () => {
    if (isOffered(this.props.application)) this.props.openOffer(this.props.id);
  }
  render() {
    const { props } = this;
    return (<ULItem
      legend={props.project.name}
      rightIcon={<span onClick={this.handleOpenOffer} className={status}>{displayStatus(props.application)}</span>}
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

const mapDispatchToProps = (dispatch: $$dispatch) => ({
  openOffer(applicationId) {
    dispatch(panelActions.openOffersAccept(applicationId));
  },
});

export default flowRight([
  connect(mapStateToPropsFactory, mapDispatchToProps),
])(ApplicationListItem);
