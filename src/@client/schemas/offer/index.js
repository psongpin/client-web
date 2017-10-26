// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Offer';

export default standardizeEntity({
  properties,
  Model,
  relationships: [],
});
