// @flow
// $FlowFixMe
import { relationshipTypes } from 'erschema';
import { standardizeEntity, nullToUndefined } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Internship';

const modifier = nullToUndefined(['name', 'description', 'status']);

export default standardizeEntity({
  properties,
  Model,
  modifier,
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
