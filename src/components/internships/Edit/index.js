// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { form } from '@client/hoc';
import {
  CodeMirror,
  Dropdown,
  Button,
  CardText,
  CardActions,
  Card,
  TextInput,
  Checkbox,
} from 'ui-kit';
import internshipActions from '@client/actions/internships';
import applicationActions from '@client/actions/applications';
import internshipSelectors from '@client/selectors/internships';
import Internship, {
  statusTypes,
  statusLabels,
} from '@client/models/Internship';

type $formProps = {
  fields: any,
};

type $stateProps = {
  id: $$id,
  internship: Internship,
};

type $dispatchProps = {
  find: (id: $$id) => void,
  goToApplicants: Function,
  goTo: Function,
  updateInternship: Function,
};

type $props = $formProps & $stateProps & $dispatchProps & $formProps;

const statusOptions = [
  { value: 1, label: statusLabels[statusTypes.ACTIVE] },
  { value: 2, label: statusLabels[statusTypes.INACTIVE] },
];

export class EditInternship extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <Card>
        <CardText>
          <TextInput {...props.fields.get('name').toObject()} />
        </CardText>
        <CardText>
          <Checkbox {...props.fields.get('remote').toObject()} />
        </CardText>
        <CardText>
          <TextInput {...props.fields.get('location').toObject()} />
        </CardText>
        <CardText>
          <CodeMirror {...props.fields.get('description').toObject()} />
        </CardText>
        <CardText>
          <Dropdown
            source={statusOptions}
            {...props.fields.get('status').toObject()}
          />
        </CardText>
        <CardActions>
          <Button onClick={props.goTo}>Go Back</Button>
          <Button onClick={props.goToApplicants}>Applicants</Button>
        </CardActions>
      </Card>
    );
  }
}

const getInternshipId = internshipSelectors.getIdFromLocation;

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  id: getInternshipId,
  internship: internshipSelectors.find(getInternshipId),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch,
  props: $props
): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(internshipActions.get(id));
    },
    goToApplicants() {
      dispatch(applicationActions.goToApplicants(props.id));
    },
    goTo() {
      dispatch(internshipActions.goTo(props.id));
    },
    updateInternship({ name, value }) {
      return dispatch(internshipActions.update(props.id, { [name]: value }));
    },
  };
};

const fieldsSelector = () => {
  return {
    name: {},
    location: {},
    description: {},
    status: {},
    remote: {},
  };
};

const actionsSelector = props => {
  return {
    update: props.updateInternship,
  };
};

const configSelector = () => ({
  initialValuesPropName: 'internship',
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  form(fieldsSelector, actionsSelector, configSelector),
])(EditInternship);
