// @flow
import React, { PureComponent } from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import khange, { kheck } from 'khange';
import { Markdown, Button } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import applicationActions from '@client/actions/applications';
import offerActions from '@client/actions/offers';
import offerSelectors from '@client/selectors/offers';
import applicationSelectors from '@client/selectors/applications';
import { closePanel } from '@client/actions/panels';
import { getPanel } from '@client/selectors/panel';
import StandardInternship from 'components/internships/Standard';

type $props = Object;

export class AcceptOffer extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<div>
      <h2>Accept Offer</h2>
      <StandardInternship />
      <Markdown content={props.offer.message} />
      <Button onClick={props.accept}>ACCEPT</Button>
      <Button onClick={props.reject}>REJECT</Button>
    </div>);
  }
}

const getApplicationId = getPanel('applicationId');
const getOfferId = applicationSelectors.findRelatedId('offer', getApplicationId);

const mapStateToProps = createStructuredSelector({
  id: getApplicationId,
  offerId: getOfferId,
  offer: offerSelectors.find(getOfferId),
});

const mapDispatchToProps = (dispatch: $$dispatch, props: $$props)=>({
  accept() {
    return dispatch(offerActions.accept(props.offerId, props.id))
    .then(()=>dispatch(closePanel()));
  },
  reject() {
    return dispatch(offerActions.reject(props.offerId, props.id))
    .then(()=>dispatch(closePanel()));
  },
  getOffer(applicationId) {
    return dispatch(applicationActions.getOffer(applicationId));
  },
});

const onChange = (props)=>{
  return props.getOffer(props.id);
};

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  khange(kheck('id'), onChange),
])(AcceptOffer);
