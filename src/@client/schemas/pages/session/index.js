// @flow
import { standardizePage } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/pages/Session';

const pageName = 'sessions';

export default standardizePage(pageName, {
  properties,
  Model,
  relationships: {
    manyRelationships: {},
    monoRelationships: {
      user: [{
        name: 'users',
      }],
    },
  },
});
