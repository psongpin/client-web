// @flow
import React, { PureComponent } from 'react';
import InternshipCard from '../Card';
import CreateInternshipCard from '../Create';

class InternshipsGrid extends PureComponent {
  render() {
    return (
      <div>
        {this.props.create && (
          <CreateInternshipCard projectId={this.props.projectId} />
        )}
        {this.props.ids.map(id => {
          return <InternshipCard id={id} index={id} />;
        })}
      </div>
    );
  }
}

export default InternshipsGrid;
