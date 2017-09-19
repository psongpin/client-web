import Snackbar from 'react-toolbox/lib/snackbar';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import flashActions from '@client/actions/flash';


type $stateProps = {
  flash: Object;
};

type $dispatchProps = {
  onClose: Function;
}

type $props = $stateProps & $dispatchProps;

export class Flash extends PureComponent {
  props: $props;
  render() {
    const { flash, onClose } = this.props;
    return (
      <Snackbar
        onClick={onClose}
        onTimeout={onClose}
        {...flash.toObject()}
      />
    );
  }
}

const mapStateToProps = ({ flash }: Object) => ({
  flash,
});

const mapDispatchToProps = (dispatch) => ({
  onClose() {
    dispatch(flashActions.close);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
