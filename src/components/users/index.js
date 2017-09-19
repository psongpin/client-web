// @flow
import React from 'react';
import { Route } from 'react-router';

import Show from './Show';

export default [
  <Route path="users/" >
    <Route path=":userId(/)" component={Show} />
  </Route>,
];
