// @flow
import React, { PureComponent } from 'react';
import { CardTitle, Clickable, CardText } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import internshipActions from '@client/actions/internships';
import projectActions from '@client/actions/projects';
import StandardInternship from '../Standard';

class InternshipCard extends PureComponent {
  render() {
    const { props } = this;
    return (
      <GridCard>
        <CardTitle
          title={<Clickable onClick={props.goTo}>{props.internship.name}</Clickable>}
          subtitle={<Clickable onClick={props.goToProject}>{props.project.name}</Clickable>}
        />
        <CardText>
          <StandardInternship />
        </CardText>
        <CardText>
          {
            props.internship.description
          }
        </CardText>
      </GridCard>
    );
  }
}

const mapStateToPropsFactory = () => {
  const getProjectId = internshipSelectors.findRelatedId('project');
  return createStructuredSelector({
    internship: internshipSelectors.find(),
    project: projectSelectors.find(getProjectId),
  });
};

const mapDispatchToProps = (dispatch: $$dispatch, { id })=>{
  return {
    goTo: ()=>dispatch(internshipActions.goTo(id)),
    goToProject: ()=>dispatch(projectActions.goTo(id)),
  };
};

export default flowRight([
  connect(mapStateToPropsFactory),
  connect(null, mapDispatchToProps),
])(InternshipCard);
