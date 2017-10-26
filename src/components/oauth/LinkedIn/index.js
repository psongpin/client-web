// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import classnames from 'classnames';
import { Button, Icon } from 'ui-kit';
import userActions from '@client/actions/users';
import { button, linkedInButton } from './style.pcss';

type $props = Object;

class linkedIn extends PureComponent {
  state = {
    linkedInAuthUrl: '',
  };
  props: $props;
  componentWillMount() {
    this.props.getlinkedInAuthUrl().then(linkedInAuthUrl => {
      this.setState({
        linkedInAuthUrl,
      });
    });
  }
  goTolinkedIn = () => {
    window.location.href = this.state.linkedInAuthUrl;
  };
  render() {
    return (
      <Button
        disabled={this.props.disabled}
        onClick={this.goTolinkedIn}
        className={classnames(button, linkedInButton)}
      >
        <Icon name="linkedin" /> LinkedIn
      </Button>
    );
  }
}

function mapDispatchToProps() {
  return {
    getlinkedInAuthUrl: userActions.getLinkedInAuthUrl,
  };
}

export default flowRight([connect(null, mapDispatchToProps)])(linkedIn);
