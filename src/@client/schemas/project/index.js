// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Project';
import { relationshipTypes } from 'erschema';

export default standardizeEntity({
  properties,
  Model,
  relationships: [
    {
      entityName: 'internships',
      type: relationshipTypes.MANY,
    },
    {
      entityName: 'internships',
      name: 'pastInternships',
      type: relationshipTypes.MANY,
    },
    {
      entityName: 'users',
      alias: 'userId',
      name: 'user',
      type: relationshipTypes.ONE,
    },
  ],
});
