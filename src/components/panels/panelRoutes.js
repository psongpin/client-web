// @flow
import React from 'react';
import * as signupPanel from 'components/pages/Signup/routes';
import * as presignupPanel from 'components/pages/Signup/Pre/routes';
import * as preloginPanel from 'components/pages/Login/Pre/routes';
import * as loginPanel from 'components/pages/Login/routes';

const routes = [
  signupPanel,
  presignupPanel,
  preloginPanel,
  loginPanel,
  // $FlowFixMe
].reduce((finalResult, { location, component, conditionalLocation = ()=>true }) => {
  finalResult[location] = [component, conditionalLocation];
  return finalResult;
}, {});

export default function (panelLocation: string) {
  if (routes[panelLocation]) {
    const [Route] = routes[panelLocation];
    return {
      Route: Route ? <Route /> : null,
      conditionalLocation: routes[panelLocation][1],
    };
  }
  return {
    Route: null,
  };
}