// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/User';
// $FlowFixMe
import { relationshipTypes } from 'erschema';

export default standardizeEntity({
  properties,
  Model,
  relationships: [
    {
      entityName: 'projects',
      type: relationshipTypes.MANY,
    },
    {
      entityName: 'interns',
      type: relationshipTypes.MANY,
    },
  ],
});
