// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, CardText, Column, Row, Card, CardTitle, Tabs, Tab } from 'ui-kit';
import InternshipGrid from 'components/internships/Grid';
import ProjectGrid from 'components/projects/Grid';
import internshipActions from '@client/actions/internships';
import internshipSelectors from '@client/selectors/internships';
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

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: internshipSelectors.getIdFromLocation,
  internship: internshipSelectors.find(internshipSelectors.getIdFromLocation),
  currentInternIds: internshipSelectors.getRelatedIds('interns', internshipSelectors.getIdFromLocation),
  completedInternshipIds: internshipSelectors.getRelatedIds('completedInternships', internshipSelectors.getIdFromLocation),
});

export const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(internshipActions.find(id));
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
