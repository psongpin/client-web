// @flow
import { standardizePage } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/pages/Session';
import { relationshipTypes } from 'erschema';

const pageName = 'sessions';

export default standardizePage(pageName, {
  properties,
  Model,
  relationships: [
    {
      name: 'user',
      entityName: 'users',
      type: relationshipTypes.ONE,
    },
  ],
});
