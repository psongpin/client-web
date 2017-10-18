// @flow
import { relationshipTypes } from 'erschema';
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Intern';

export default standardizeEntity({
  properties,
  Model,
  relationships: [
    {
      entityName: 'users',
      name: 'user',
      alias: 'userId',
      type: relationshipTypes.ONE,
    },
    {
      entityName: 'internships',
      name: 'internship',
      alias: 'internshipId',
      type: relationshipTypes.ONE,
    },
  ],
});
