// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { openSignup } from '@client/actions/panels';
import BasePre from '../BasePre';

type $dispatchProps = {
  emailAction: Function;
}

class PreSignup extends PureComponent {
  props: $dispatchProps;
  render() {
    return (<BasePre termsOfService title="Choose Signup Option" emailAction={this.props.emailAction} />);
  }
}

function mapDispatchToProps(dispatch: $$dispatch) : $dispatchProps {
  return {
    emailAction: ()=>dispatch(openSignup),
  };
}

export default flowRight([
  connect(null, mapDispatchToProps),
])(PreSignup);
