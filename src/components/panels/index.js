// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Panel } from 'ui-kit';
import { getPanel, getPathname } from '@client/selectors/router';

import panelRoutes from './panelRoutes';
import { close } from './actions';

class PanelContainer extends Component {
  render() {
    const { onClose, panel } = this.props;
    const { Route } = panelRoutes(panel.location);
    return (
      <Panel onClose={onClose}>
        {Route}
      </Panel>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  panel: getPanel,
  pathname: getPathname,
});

function mapDispatchToProps(dispatch: $$dispatch) {
  return {
    onClose() {
      dispatch(close());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelContainer);
