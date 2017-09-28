// @flow
import { standardizePage } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/pages/Home';

const pageName = 'home';

export default standardizePage(pageName, {
  Model,
  properties,
});
