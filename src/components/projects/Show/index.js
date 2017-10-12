// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Button, View, CardText, Column, Row, Card, CardTitle, CardActions } from 'ui-kit';
import projectActions from '@client/actions/projects';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import Project from '@client/models/Project';
import InternshipsTab from '../InternshipsTab';
import { container } from './style.pcss';


type $stateProps = {
  id: $$id,
  project: Project,
  editing: boolean,
};

type $dispatchProps = {
  find: (id: $$id)=>void;
  goToEditProject: ()=>void;
};

type $props = $stateProps & $dispatchProps;

export class ShowProject extends PureComponent {
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
            <CardActions>
              {
                props.editing && <Button onClick={props.goToEditProject}>Edit</Button>
              }
            </CardActions>
          </Card>
        </Column>
        <Column xs={12} size={8}>
          <InternshipsTab id={props.id} />
        </Column>
      </Row>
    </View>);
  }
}

const isEditing = createSelector([
    sessionSelectors.getCurrentUserId(),
    projectSelectors.findRelatedId('user', projectSelectors.getIdFromLocation),
  ],
  (currentUserId, projectUserId)=>{
    return currentUserId === projectUserId;
  });

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  id: projectSelectors.getIdFromLocation,
  project: projectSelectors.find(projectSelectors.getIdFromLocation),
  editing: isEditing,
});

export const mapDispatchToProps = (dispatch: $$dispatch, props: $props): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(projectActions.get(id));
    },
    goToEditProject() {
      dispatch(projectActions.goToEdit(props.id));
    },
  };
};

export const onIdChange = ({
  id, find,
}: $props) => {
  find(id);
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange([
    [kheck('id'), onIdChange],
  ]),
])(ShowProject);
