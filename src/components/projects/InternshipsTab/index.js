// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { flowRight } from 'lodash';

import { khange, kheck } from '@client/hoc';
import { Tabs, Tab } from 'ui-kit';
import InternshipGrid from 'components/internships/Grid';
import projectActions from '@client/actions/projects';
import projectSelectors from '@client/selectors/projects';

export class ProjectInternshipsTab extends PureComponent {
  render() {
    const { props } = this;
    return (<Tabs>
      <Tab label="CURRENT INTERNSHIPS"><InternshipGrid create projectId={props.id} ids={props.currentInternshipIds} /></Tab>
      <Tab label="PAST INTERNSHIPS"><InternshipGrid ids={props.pastInternshipIds} /></Tab>
    </Tabs>);
  }
}

export const mapStateToProps : $$selectorExact<$stateProps> = createStructuredSelector({
  currentInternshipIds: projectSelectors.getRelatedIds('internships'),
  pastInternshipIds: projectSelectors.getRelatedIds('pastInternships'),
});

export const mapDispatchToProps = (dispatch: $$dispatch): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(projectActions.get(id));
    },
    getInternships(id) {
      dispatch(projectActions.getInternships(id));
    },
  };
};

export const onIdChange = ({
  id, getInternships,
}: $props) => {
  getInternships(id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onIdChange),
])(ProjectInternshipsTab);
