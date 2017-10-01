// @flow
import React, { PureComponent } from 'react';
import { CardTitle } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import projectSelectors from '@client/selectors/projects';

class ProjectCard extends PureComponent {
  render() {
    const { project } = this.props;
    return (
      <GridCard>
        <CardTitle
          title={project.name}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  project: projectSelectors.find(),
});

export default connect(mapStateToProps)(ProjectCard);
