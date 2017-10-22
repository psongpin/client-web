// @flow
import React, { PureComponent } from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { CodeMirror, Button } from 'ui-kit';
import { createStructuredSelector } from 'reselect';
import { form } from '@client/hoc';
import offerActions from '@client/actions/offers';
import { closePanel } from '@client/actions/panels';
import { getPanel } from '@client/selectors/panel';
import StandardInternship from 'components/internships/Standard';

type $props = Object;

export class CreateOffer extends PureComponent {
  props: $props;
  render() {
    const { props } = this;
    return (<div>
      <h2>Send Offer</h2>
      <StandardInternship />
      <CodeMirror {...props.fields.get('message').toObject()} />
      <Button {...props.actions.submit}>SEND</Button>
      <Button onClick={props.close}>CANCEL</Button>
    </div>);
  }
}


const mapStateToProps = createStructuredSelector({
  id: getPanel('applicationId'),
});

const mapDispatchToProps = (dispatch: $$dispatch, props: $$props)=>({
  createOffer(offer) {
    return dispatch(offerActions.create({ ...offer, applicationId: props.id }))
    .then(()=>dispatch(closePanel()));
  },
  close() {
    return dispatch(closePanel());
  },
});

const fieldSelector = (props)=>{
  return {
    message: {
      value: '',
    },
  };
};

const actionSelector = (props)=>({
  submit: props.createOffer,
});

export default flowRight([
  connect(mapStateToProps),
  connect(null, mapDispatchToProps),
  form(fieldSelector, actionSelector),
])(CreateOffer);
