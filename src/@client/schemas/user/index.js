// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/User';
import { relationshipTypes } from 'erschema';

export default standardizeEntity({
  properties,
  Model,
  relationships: [
    {
      entityName: 'interns',
      type: relationshipTypes.MANY,
    },
    {
      entityName: 'projects',
      type: relationshipTypes.MANY,
    },
  ],
});
