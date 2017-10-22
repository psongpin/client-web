// @flow
import React, { PureComponent } from 'react';
import { CardTitle, Clickable, CardText } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import projectSelectors from '@client/selectors/projects';
import projectActions from '@client/actions/projects';

class ProjectCard extends PureComponent {
  render() {
    const { project, goToProject } = this.props;
    return (
      <GridCard>
        <CardTitle
          title={<Clickable onClick={goToProject}>{project.name}</Clickable>}
        />
        <CardText>
          {project.description}
        </CardText>
      </GridCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  project: projectSelectors.find(),
});

const mapDispatchToProps = (dispatch: $$dispatch, props: Object) => ({
  goToProject: ()=>dispatch(projectActions.goTo(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
