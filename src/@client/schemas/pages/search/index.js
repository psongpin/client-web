// @flow
import { standardizePage } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/pages/Search';
import { relationshipTypes } from 'erschema';

const pageName = 'search';

export default standardizePage(pageName, {
  properties,
  Model,
  relationships: [
    {
      entityName: 'users',
      type: relationshipTypes.MANY,
    },
    {
      entityName: 'internships',
      type: relationshipTypes.MANY,
    },
    {
      entityName: 'projects',
      type: relationshipTypes.MANY,
    },
  ],
});
