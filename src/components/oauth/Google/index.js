// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import classnames from 'classnames';
import { Button, Icon } from 'ui-kit';
import userActions from '@client/actions/users';
import { button, googleButton } from './style.pcss';

type $props = Object;

class Google extends PureComponent {
  state = {
    googleAuthUrl: '',
  };
  props: $props;
  componentWillMount() {
    this.props.getGoogleAuthUrl().then(googleAuthUrl => {
      this.setState({
        googleAuthUrl,
      });
    });
  }
  goToGoogle = () => {
    window.location.href = this.state.googleAuthUrl;
  };
  render() {
    return (
      <Button
        onClick={this.goToGoogle}
        className={classnames(button, googleButton)}
      >
        <Icon name="google" /> Google
      </Button>
    );
  }
}

function mapDispatchToProps() {
  return {
    getGoogleAuthUrl: userActions.getGoogleAuthUrl,
  };
}

export default flowRight([connect(null, mapDispatchToProps)])(Google);
