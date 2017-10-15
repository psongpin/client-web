// @flow
import React, { PureComponent } from 'react';
import ULItem from 'components/shared/AppULItem';
import { Button } from 'ui-kit';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { createStructuredSelector } from 'reselect';
import applicationSelectors from '@client/selectors/applications';
import { displayStatus } from '@client/models/Application';
import userSelectors from '@client/selectors/users';
import { openOffersCreate } from '@client/actions/panels';
import { status, offer, reject } from './style.pcss';

type $props = Object;

export class ApplicantListItem extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<ULItem
      legend={displayStatus(props.applicant)}
      rightActions={[<Button onClick={props.openOffer} className={offer}>OFFER</Button>, <Button className={reject}>REJECT</Button>]}
    >
      {
        props.user.username
      }
    </ULItem>);
  }
}

const mapStateToPropsFactory = ()=>{
  const getUserId = applicationSelectors.findRelatedId('user');
  return createStructuredSelector({
    applicant: applicationSelectors.find(),
    user: userSelectors.find(getUserId),
  });
};

const mapDispatchToProps = (dispatch: $$dispatch, props: $props)=>{
  return {
    openOffer() {
      dispatch(openOffersCreate(props.id));
    },
  };
};

export default flowRight([
  connect(mapStateToPropsFactory, mapDispatchToProps),
])(ApplicantListItem);
