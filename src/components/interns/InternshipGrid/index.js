// @flow
import React, { PureComponent } from 'react';
import InternInternshipCard from '../InternshipCard';

class InternInternshipsGrid extends PureComponent {
  render() {
    return (<div>
      {
        this.props.ids.map((id) => {
          return <InternInternshipCard id={id} index={id} />;
        })
      }
    </div>);
  }
}

export default InternInternshipsGrid;
