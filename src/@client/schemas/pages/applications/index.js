// @flow
// $FlowFixMe
import { relationshipTypes } from 'erschema';
import { standardizePage } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/pages/Application';

const pageName = 'applications';

export default standardizePage(pageName, {
  Model,
  properties,
  relationships: [
    {
      entityName: 'applications',
      type: relationshipTypes.MANY,
    },
  ],
});
