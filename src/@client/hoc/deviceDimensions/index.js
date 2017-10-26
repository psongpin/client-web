// Phones Less than 768px
// .col-sm-$	Small Devices	Tablets 768px and Up
// .col-md-$	Medium Devices	Desktops 992px and Up
// .col-lg-$	Large Devices	Large Desktops 1200px and Up

// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isPanelActive } from '@client/selectors/panel';

export default (WrappedComponent: any) => {
  class DeviceDimensions extends PureComponent {
    getDevice = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        return 'phone';
      }
      if (width <= 992) {
        return 'tablet';
      }
      return 'desktop';
    };
    render() {
      return <WrappedComponent device={this.getDevice()} {...this.props} />;
    }
  }
  const mapStateToProps = createStructuredSelector({
    activePanel: isPanelActive,
  });
  return connect(mapStateToProps)(DeviceDimensions);
};
