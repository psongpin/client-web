// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';
import { List } from 'immutable';

import { khange, kheck } from '@client/hoc';
import {
  Markdown,
  Button,
  View,
  CardText,
  Column,
  Row,
  Card,
  CardTitle,
  CardActions,
} from 'ui-kit';
import projectActions from '@client/actions/projects';
import userActions from '@client/actions/users';
import projectSelectors from '@client/selectors/projects';
import sessionSelectors from '@client/selectors/pages/sessions';
import Project from '@client/models/Project';
import GoToUser from 'components/users/GoTo';
import InternshipsTab from '../InternshipsTab';

type $stateProps = {
  id: $$id,
  project: Project,
  editing: boolean,
  currentUserId: $$id,
  internshipIds: List<$$id>,
  pastInternshipIds: List<$$id>,
  userId: $$id,
};

type $dispatchProps = {
  find: Function,
  getUser: Function,
  goToEditProject: () => void,
  deleteProject: Function,
};

type $props = $stateProps & $dispatchProps;

export class ShowProject extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <View>
        <Row>
          <Column xs={12} size={4}>
            <Card>
              <CardTitle
                title={props.project.name}
                subtitle={<GoToUser id={props.userId} />}
              />
              <CardText>
                <Markdown content={props.project.description} />
              </CardText>
              <CardActions>
                {props.editing && (
                  <Button onClick={props.goToEditProject}>Edit</Button>
                )}
                {props.editing &&
                  !props.internshipIds.size &&
                  !props.pastInternshipIds.size && (
                    <Button
                      onConfirmClick={props.deleteProject}
                      confirmationMessage="Are you sure you want to delete this project?"
                    >
                      Delete
                    </Button>
                  )}
              </CardActions>
            </Card>
          </Column>
          <Column xs={12} size={8}>
            <InternshipsTab id={props.id} />
          </Column>
        </Row>
      </View>
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: projectSelectors.getIdFromLocation,
  project: projectSelectors.find(projectSelectors.getIdFromLocation),
  userId: projectSelectors.findRelatedId(
    'user',
    projectSelectors.getIdFromLocation
  ),
  editing: projectSelectors.currentUserOwnsProject(
    projectSelectors.getIdFromLocation
  ),
  currentUserId: sessionSelectors.getCurrentUserId(),
  internshipIds: projectSelectors.getRelatedIds(
    'internships',
    projectSelectors.getIdFromLocation
  ),
  pastInternshipIds: projectSelectors.getRelatedIds(
    'pastInternships',
    projectSelectors.getIdFromLocation
  ),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> => {
  return {
    find(id) {
      return dispatch(projectActions.get(id));
    },
    getUser(id) {
      return dispatch(userActions.get(id));
    },
    goToEditProject() {
      dispatch(projectActions.goToEdit(props.id));
    },
    deleteProject() {
      return dispatch(projectActions.del(props.id)).then(() => {
        return dispatch(userActions.goTo(props.currentUserId));
      });
    },
  };
};

export const onIdChange = ({ id, find, getUser }: $props) => {
  find(id).then(project => {
    getUser(project.userId);
  });
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange([[kheck('id'), onIdChange]]),
])(ShowProject);
