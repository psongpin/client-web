// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck, form } from '@client/hoc';
import {
  CodeMirror,
  View,
  CardActions,
  Button,
  CardText,
  Column,
  Row,
  Card,
  TextInput,
} from 'ui-kit';
import projectActions from '@client/actions/projects';
import projectSelectors from '@client/selectors/projects';
import Project from '@client/models/Project';
import InternshipsTab from '../InternshipsTab';

type $stateProps = {
  id: $$id,
  project: Project,
};

type $dispatchProps = {
  find: (id: $$id) => void,
  update: (propObj: Object) => Promise<any>,
  goTo: () => void,
};

type $formProps = {
  fields: any,
};

type $props = $stateProps & $dispatchProps & $formProps;

export class EditProject extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <View>
        <Row>
          <Column xs={12} size={4}>
            <Card>
              <CardText>
                <TextInput {...props.fields.get('name').toObject()} />
              </CardText>
              <CardText>
                <CodeMirror {...props.fields.get('description').toObject()} />
              </CardText>
              <CardActions>
                <Button onClick={this.props.goTo}>Go Back</Button>
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
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $$props
): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(projectActions.get(id));
    },
    update({ name, value }) {
      return dispatch(
        projectActions.update(props.id, {
          [name]: value,
        })
      );
    },
    goTo() {
      dispatch(projectActions.goTo(props.id));
    },
  };
};

export const onIdChange = ({ id, find }: $props) => {
  find(id);
};

const actionsSelector = props => ({
  update: props.update,
});

const configSelector = () => ({
  initialValuesPropName: 'project',
});

const fieldsSelector = () => ({
  name: {},
  description: {},
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange([[kheck('id'), onIdChange]]),
  form(fieldsSelector, actionsSelector, configSelector),
])(EditProject);
