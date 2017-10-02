// @flow
import React from 'react';
import { Route } from 'react-router';

import Show from './Show';

export default [
  <Route path="projects/" >
    <Route path=":projectId(/)" component={Show} />
  </Route>,
];
