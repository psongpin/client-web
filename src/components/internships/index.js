// @flow
import React from 'react';
import { Route } from 'react-router';

import Show from './Show';

export default [
  <Route path="internships/" >
    <Route path=":internshipId(/)" component={Show} />
  </Route>,
];
