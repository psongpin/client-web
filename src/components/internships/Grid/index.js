// @flow
import React, { PureComponent } from 'react';
import InternshipCard from '../Card';

class InternshipsGrid extends PureComponent {
  render() {
    return (<div>{
      this.props.ids.map((id) => {
        return <InternshipCard id={id} index={id} />;
      })
    }
    </div>);
  }
}

export default InternshipsGrid;
