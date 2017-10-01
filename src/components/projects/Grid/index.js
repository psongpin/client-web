// @flow
import React, { PureComponent } from 'react';
import ProjectCard from '../Card';

class ProjectsGrid extends PureComponent {
  render() {
    return (<div>{
      this.props.ids.map((id) => {
        return <ProjectCard id={id} index={id} />;
      })
    }
    </div>);
  }
}

export default ProjectsGrid;
