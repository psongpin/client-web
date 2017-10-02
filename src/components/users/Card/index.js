// @flow
import React, { PureComponent } from 'react';
import { CardTitle } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import userSelectors from '@client/selectors/users';

class UserCard extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <GridCard>
        <CardTitle
          title={user.name}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelectors.find(),
});

export default connect(mapStateToProps)(UserCard);
