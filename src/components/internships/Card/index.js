// @flow
import React, { PureComponent } from 'react';
import { CardTitle } from 'ui-kit';
import GridCard from 'components/shared/GridCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import internshipSelectors from '@client/selectors/internships';

class InternshipCard extends PureComponent {
  render() {
    const { internship } = this.props;
    return (
      <GridCard>
        <CardTitle
          title={internship.name}
        />
      </GridCard>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  internship: internshipSelectors.find(),
});

export default connect(mapStateToProps)(InternshipCard);
