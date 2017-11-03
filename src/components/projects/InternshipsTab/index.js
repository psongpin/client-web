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

type $ownProps = {
  id: $$id,
};

type $stateProps = {
  currentInternshipIds: any,
  pastInternshipIds: any,
  projectOwner: boolean,
};

type $dispatchProps = {
  find: Function,
  getInternships: Function,
  getPastInternships: Function,
};

type $props = $ownProps & $stateProps & $dispatchProps;

export class ProjectInternshipsTab extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (
      <Tabs>
        <Tab label="ACTIVE INTERNSHIPS">
          <InternshipGrid
            create={props.projectOwner}
            projectId={props.id}
            ids={props.currentInternshipIds}
          />
        </Tab>
        <Tab label="INACTIVE INTERNSHIPS">
          <InternshipGrid ids={props.pastInternshipIds} />
        </Tab>
      </Tabs>
    );
  }
}

export const mapStateToProps: $$selectorExact<
  $stateProps
> = createStructuredSelector({
  projectOwner: projectSelectors.currentUserOwnsProject(),
  currentInternshipIds: projectSelectors.getRelatedIds('internships'),
  pastInternshipIds: projectSelectors.getRelatedIds('pastInternships'),
});

export const mapDispatchToProps = (
  dispatch: $$dispatch
): $Exact<$dispatchProps> => {
  return {
    find(id) {
      dispatch(projectActions.get(id));
    },
    getInternships(id) {
      dispatch(projectActions.getInternships(id));
    },
    getPastInternships(id) {
      dispatch(projectActions.getPastInternships(id));
    },
  };
};

export const onIdChange = ({
  id,
  getInternships,
  getPastInternships,
}: $props) => {
  getInternships(id);
  getPastInternships(id);
};

export default flowRight([
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onIdChange),
])(ProjectInternshipsTab);
