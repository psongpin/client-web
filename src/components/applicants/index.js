// @flow
import React from 'react';
import { Route } from 'react-router';

import ShowAll from './ShowAll';

export default [
  <Route path="applicants/" >
    <Route path=":internshipId(/)" component={ShowAll} />
  </Route>,
];
