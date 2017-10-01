// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Project';

export default standardizeEntity({
  properties,
  Model,
});
