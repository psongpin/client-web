// @flow
import { standardizePage } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/pages/Application';

const pageName = 'applications';

export default standardizePage(pageName, {
  Model,
  properties,
  relationships: [
    {
      entityName: 'applications',
    },
  ],
});
