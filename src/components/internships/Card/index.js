// @flow
import React, { PureComponent } from 'react';
import { Markdown, CardTitle, Clickable, CardText } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import internshipSelectors from '@client/selectors/internships';
import internshipActions from '@client/actions/internships';
import projectActions from '@client/actions/projects';
import GoToProject from 'components/projects/GoTo';
import PointsTotal from 'components/points/Total';
import StandardInternship from '../Standard';
import InternshipDotX3 from '../DotX3';
import LocationRemote from '../LocationRemote';

class InternshipCard extends PureComponent {
  render() {
    const { props } = this;
    return (
      <GridCard>
        <CardTitle
          avatar={
            props.internship.points ? (
              <PointsTotal points={props.internship.points} />
            ) : (
              undefined
            )
          }
          title={
            <Clickable onClick={props.goTo}>{`${props.internship.name}${props
              .internship.remote
              ? ' - Remote'
              : ''}`}</Clickable>
          }
          subtitle={<GoToProject id={props.projectId} />}
        />
        <LocationRemote internship={this.props.internship} />
        <CardText>
          <StandardInternship />
        </CardText>
        <CardText>
          <InternshipDotX3>
            <Markdown content={props.internship.description} />
          </InternshipDotX3>
        </CardText>
      </GridCard>
    );
  }
}

const mapStateToPropsFactory = () => {
  return createStructuredSelector({
    internship: internshipSelectors.find(),
    projectId: internshipSelectors.findRelatedId('project'),
  });
};

const mapDispatchToProps = (dispatch: $$dispatch, { id }) => {
  return {
    goTo: () => dispatch(internshipActions.goTo(id)),
    goToProject: () => dispatch(projectActions.goTo(id)),
  };
};

export default flowRight([
  connect(mapStateToPropsFactory),
  connect(null, mapDispatchToProps),
])(InternshipCard);
