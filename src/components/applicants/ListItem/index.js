// @flow
import React, { PureComponent } from 'react';
import ULItem from 'components/shared/AppULItem';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import applicantSelectors from '@client/selectors/applicants';
import userSelectors from '@client/selectors/users';
import { status } from './style.pcss';

export class ApplicantListItem extends PureComponent {
  render() {
    const { props } = this;
    return (<ULItem
      rightIcon={<span className={status}>{props.applicant.status}</span>}
    >
      {
        props.user.username
      }
    </ULItem>);
  }
}

const mapStateToPropsFactory = ()=>{
  const getUserId = applicantSelectors.findRelatedId('user');
  return createStructuredSelector({
    applicant: applicantSelectors.find(),
    user: userSelectors.find(getUserId),
  });
};

export default flowRight([
  connect(mapStateToPropsFactory),
])(ApplicantListItem);
