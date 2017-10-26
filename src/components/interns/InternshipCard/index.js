// @flow
import React, { PureComponent } from 'react';
import { form } from '@client/hoc';
import { Button, CardTitle, Clickable, CardText, TextInput } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import internSelectors from '@client/selectors/interns';
import internshipSelectors from '@client/selectors/internships';
import projectSelectors from '@client/selectors/projects';
import internActions from '@client/actions/interns';
import internshipActions from '@client/actions/internships';
import projectActions from '@client/actions/projects';
import MinutesAndStatus from '../MinutesAndStatus';

type $props = Object;

class InternCard extends PureComponent {
  props: $props;
  goToInternship = () => {
    this.props.goToInternship(this.props.internshipId);
  };
  goToProject = () => {
    this.props.goToProject(this.props.projectId);
  };
  render() {
    const { props } = this;
    return (
      <GridCard>
        <CardTitle
          title={
            <Clickable onClick={this.goToInternship}>
              {props.internship.name}
            </Clickable>
          }
          subtitle={
            <Clickable onClick={this.goToProject}>
              {props.project.name}
            </Clickable>
          }
        />
        <MinutesAndStatus intern={props.intern} />
        {props.owner && (
          <CardText>
            <TextInput
              {...props.fields.get('minutes').toObject()}
              type="number"
            />
            <Button {...props.actions.submit}>Submit Hours</Button>
          </CardText>
        )}
      </GridCard>
    );
  }
}

const mapStateToPropsFactory = () => {
  const getInternshipId = internSelectors.findRelatedId('internship');
  const getProjectId = internshipSelectors.findRelatedId(
    'project',
    getInternshipId
  );
  return createStructuredSelector({
    intern: internSelectors.find(),
    internshipId: getInternshipId,
    internship: internshipSelectors.find(getInternshipId),
    projectId: getProjectId,
    project: projectSelectors.find(getProjectId),
  });
};

const mapDispatchToProps = (dispatch: $$dispatch, { id, intern }) => {
  return {
    goToProject: projectId => dispatch(projectActions.goTo(projectId)),
    goToInternship: internshipId =>
      dispatch(internshipActions.goTo(internshipId)),
    logMinutes: ({ minutes }) =>
      dispatch(internActions.logMinutes(id, intern.minutes, minutes * 60)),
  };
};

const fieldSelector = () => ({
  minutes: {
    label: 'Hours',
    verify: ['required'],
  },
});

const actionSelector = props => ({
  submit: props.logMinutes,
});

const configSelector = () => ({
  initialPropName: 'intern',
});

export default flowRight([
  connect(mapStateToPropsFactory),
  connect(null, mapDispatchToProps),
  form(fieldSelector, actionSelector, configSelector),
])(InternCard);
