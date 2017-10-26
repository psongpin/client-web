// @flow
import React, { PureComponent } from 'react';
import { Markdown, CardTitle, Clickable, CardText } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import projectSelectors from '@client/selectors/projects';
import projectActions from '@client/actions/projects';
import ProjectDotX3 from '../DotX3';

class ProjectCard extends PureComponent {
  render() {
    const { project, goToProject } = this.props;
    return (
      <GridCard>
        <CardTitle
          title={<Clickable onClick={goToProject}>{project.name}</Clickable>}
        />
        <CardText>
          <ProjectDotX3>
            <Markdown content={project.description} />
          </ProjectDotX3>
        </CardText>
      </GridCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  project: projectSelectors.find(),
});

const mapDispatchToProps = (dispatch: $$dispatch, props: Object) => ({
  goToProject: () => dispatch(projectActions.goTo(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard);
