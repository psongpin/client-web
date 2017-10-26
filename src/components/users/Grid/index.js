// @flow
import React, { PureComponent } from 'react';
import UserCard from '../Card';

class UsersGrid extends PureComponent {
  render() {
    return (
      <div>
        {this.props.ids.map(id => {
          return <UserCard id={id} index={id} />;
        })}
      </div>
    );
  }
}

export default UsersGrid;
