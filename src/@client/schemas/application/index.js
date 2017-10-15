// @flow
import { relationshipTypes } from 'erschema';
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Application';

export default standardizeEntity({
  properties,
  Model,
  relationships: [
    {
      name: 'internship',
      entityName: 'internships',
      type: relationshipTypes.ONE,
    },
    {
      name: 'offer',
      entityName: 'offers',
      type: relationshipTypes.ONE,
    },
  ],
});
