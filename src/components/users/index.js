// @flow
import React from 'react';
import { Route } from 'react-router';

import Show from './Show';
import Edit from './Edit';
import ShowEditWrapper from './ShowEditWrapper';

export default [
  <Route path="users/" component={ShowEditWrapper}>
    <Route path=":userId(/)" component={Show} />
    <Route path=":userId/edit" component={Edit} />
  </Route>,
];
