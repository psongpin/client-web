// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/Internship';

export default standardizeEntity({
  properties,
  Model,
});
