// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { openLogin } from '@client/actions/panels';
import BasePre from 'components/pages/Signup/BasePre';

class PreLogin extends PureComponent {
  props: Object;
  render() {
    return (
      <BasePre
        title="Choose Login Option"
        emailAction={this.props.emailAction}
      />
    );
  }
}

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    emailAction: () => dispatch(openLogin),
  };
}

export default flowRight([connect(null, mapDispatchToProps)])(PreLogin);
