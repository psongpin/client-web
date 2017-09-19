// @flow
import { standardizeEntity } from '@client/utils/schemaUtils';
import Model, { properties } from '@client/models/User';

export default standardizeEntity({
  properties,
  Model,
  relationships: {
    monoRelationships: {},
    manyRelationships: {
      mySections: [{
        name: 'publishedSections',
      }],
      ranks: [{
        name: 'ranks',
      }],
      cocontributors: [{
        name: 'cocontributors',
      }],
    },
  },
});
