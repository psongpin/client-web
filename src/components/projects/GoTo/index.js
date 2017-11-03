// @flow
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Clickable } from 'ui-kit';
import projectSelectors from '@client/selectors/projects';
import projectActions from '@client/actions/projects';

type $props = Object;

export class GoToProject extends React.PureComponent {
  props: $props;
  render() {
    return (
      <Clickable onClick={this.props.goTo}>{this.props.project.name}</Clickable>
    );
  }
}

export const mapStateToProps = createStructuredSelector({
  project: projectSelectors.find(),
});

export const mapDispatchToProps = (dispatch: $$dispatch, { id }: $props) => ({
  goTo: () => dispatch(projectActions.goTo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoToProject);
