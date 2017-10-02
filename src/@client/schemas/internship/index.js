// @flow
import { relationshipTypes } from 'erschema';
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Internship';

export default standardizeEntity({
  properties,
  Model,
  relationships: [
    {
      name: 'interns',
      entityName: 'users',
      type: relationshipTypes.MANY,
    },
    {
      name: 'completedInternships',
      entityName: 'users',
      type: relationshipTypes.MANY,
    },
    {
      name: 'project',
      entityName: 'projects',
      alias: 'projectId',
      type: relationshipTypes.ONE,
    },
  ],
});
