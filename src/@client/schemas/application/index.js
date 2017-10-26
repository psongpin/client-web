// @flow
// $FlowFixMe
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
      alias: 'internshipId',
    },
    {
      name: 'offer',
      entityName: 'offers',
      type: relationshipTypes.ONE,
    },
    {
      name: 'user',
      entityName: 'users',
      type: relationshipTypes.ONE,
      alias: 'userId',
    },
  ],
});
