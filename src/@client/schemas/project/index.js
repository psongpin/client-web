// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Project';
// $FlowFixMe
import { relationshipTypes } from 'erschema';

export default standardizeEntity({
  properties,
  Model,
  modifier: ent => {
    const { name, ...otherProps } = ent;
    if (!ent.name) return otherProps;
    return ent;
  },
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
