// @flow
import { relationshipTypes } from 'erschema';
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Internship';

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
      name: 'interns',
      entityName: 'interns',
      type: relationshipTypes.MANY,
    },
    {
      name: 'finishedInterns',
      entityName: 'interns',
      type: relationshipTypes.MANY,
    },
    {
      name: 'project',
      entityName: 'projects',
      alias: 'projectId',
      type: relationshipTypes.ONE,
    },
    {
      entityName: 'applications',
      type: relationshipTypes.MANY,
    },
  ],
});
