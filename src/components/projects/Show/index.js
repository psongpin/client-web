// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { View, CardText, Column, Row, Card, CardTitle, Tabs, Tab } from 'ui-kit';
import InternshipGrid from 'components/projects/Grid';
import projectActions from '@client/actions/projects';
import projectSelectors from '@client/selectors/projects';
import Project from '@client/models/Project';
import { container } from './style.pcss';


type $stateProps = {
  id: $$id,
  project: Project,
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
              title={props.project.name}
            />
            <CardText>
              {props.project.description}
            </CardText>
          </Card>
        </Column>
        {
          <Column xs={12} size={8}>
            <Tabs>
              <Tab label="CURRENT INTERNSHIPS"><InternshipGrid ids={props.currentInternshipIds} /></Tab>
              <Tab label="PAST INTERNSHIPS"><InternshipGrid ids={props.pastInternshipIds} /></Tab>
            </Tabs>
          </Column>
        }
      </Row>
    </View>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: projectSelectors.getIdFromLocation,
  project: projectSelectors.find(projectSelectors.getIdFromLocation),
  currentInternshipIds: projectSelectors.getRelatedIds('projects', projectSelectors.getIdFromLocation),
  pastInternshipIds: projectSelectors.getRelatedIds('pastInternships', projectSelectors.getIdFromLocation),
});

export const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(projectActions.find(id));
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
