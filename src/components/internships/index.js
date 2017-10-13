// @flow
import React from 'react';
import { Route } from 'react-router';

import Show from './Show';
import Edit from './Edit';
import ShowEditWrapper from './ShowEditWrapper';

export default [
  <Route path="internships/" component={ShowEditWrapper}>
    <Route path=":internshipId(/)" component={Show} />
    <Route path=":internshipId/edit" component={Edit} />
  </Route>,
];
