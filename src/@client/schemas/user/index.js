// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/User';

export default standardizeEntity({
  properties,
  Model,
});
