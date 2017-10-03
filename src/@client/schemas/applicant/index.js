// @flow
import { relationshipTypes } from 'erschema';
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Applicant';

export default standardizeEntity({
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
