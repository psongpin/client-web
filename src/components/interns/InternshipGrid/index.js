// @flow
import React, { PureComponent } from 'react';
import InternInternshipCard from '../InternshipCard';

type $props = Object;

class InternInternshipsGrid extends PureComponent {
  props: $props;
  render() {
    return (
      <div>
        {this.props.ids.size === 0 && (
          <p>This user has not interned with any active projects</p>
        )}
        {this.props.ids.map(id => {
          return (
            <InternInternshipCard owner={this.props.owner} id={id} index={id} />
          );
        })}
      </div>
    );
  }
}

export default InternInternshipsGrid;
