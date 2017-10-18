// @flow
import React, { PureComponent } from 'react';
import InternCard from '../Card';

type $props = Object;

class InternsGrid extends PureComponent {
  props: $props;
  render() {
    return (<div>
      {
        this.props.ids.map((id) => {
          return <InternCard owner={this.props.owner} id={id} index={id} />;
        })
      }
    </div>);
  }
}

export default InternsGrid;
