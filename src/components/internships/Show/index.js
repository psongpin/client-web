// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Button, View, CardText, Column, Row, Card, CardTitle, Tabs, Tab } from 'ui-kit';
import InternshipGrid from 'components/internships/Grid';
import ProjectGrid from 'components/projects/Grid';
import internshipActions from '@client/actions/internships';
import applicantActions from '@client/actions/applicants';
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
};

type $props = $stateProps & $dispatchProps;

export class ShowInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<View className={container}>
      <Row>
        <Column xs={12} size={4}>
          <Card>
            <CardTitle
              title={props.internship.name}
            />
            <CardText>
              {props.internship.description}
            </CardText>
            {
              (props.userId === props.currentUserId || true) && (<CardText>
                <Button onClick={()=>props.goToApplicants(props.id)}>
                  Applicants
                </Button>
              </CardText>)
            }
          </Card>
        </Column>
        {
          <Column xs={12} size={8}>
            <Tabs>
              <Tab label="CURRENT INTERNS"><InternshipGrid ids={props.currentInternIds}/></Tab>
              <Tab label="COMPLETED INTERNSHIPS"><ProjectGrid ids={props.completedInternshipIds}/></Tab>
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

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: getInternshipId,
  internship: internshipSelectors.find(getInternshipId),
  currentInternIds: internshipSelectors.getRelatedIds('interns', getInternshipId),
  completedInternshipIds: internshipSelectors.getRelatedIds('completedInternships', getInternshipId),
  project: projectSelectors.find(getProjectId),
  userId: getUserId,
  currentUserId: sessionSelectors.getCurrentUserId(),
});

export const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(internshipActions.get(id));
    },
    goToApplicants(id) {
      console.log(id);
      dispatch(applicantActions.goTo(id));
    },
  };
};

export const onIdChange = ({
  id, find,
}: $props) => {
  find(id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange([
    [kheck('id'), onIdChange],
  ]),
])(ShowInternship);
