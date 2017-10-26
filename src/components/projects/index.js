// @flow
import React from 'react';
import { Route } from 'react-router';

import Show from './Show';
import Edit from './Edit';

export default [
  <Route path="projects/">
    <Route path=":projectId(/)" component={Show} />
    <Route path=":projectId/edit" component={Edit} />
  </Route>,
];
