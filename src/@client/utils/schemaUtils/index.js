// @flow
import { pick } from 'lodash';
// $FlowFixMe
import { standardizeEntity as erschemaStandardizeEntity } from 'erschema';
import { Record } from 'immutable';

class DefaultPageModel extends Record({ id: '' }) {}
export function standardizePage(
  pageName: string,
  { properties = [], Model = DefaultPageModel, relationships }: Object,
) {
  return erschemaStandardizeEntity({
    properties,
    Model,
    relationships,
    idFunc: () => pageName,
    modifier: ent => ({ id: pageName, ...ent }),
  });
}

function noopModifier(ent) {
  return ent;
}

function pickProperties(properties, modifier = noopModifier) {
  return ent => pick(modifier(ent), Object.keys(properties));
}

export function standardizeEntity(values: *) {
  return erschemaStandardizeEntity({
    ...values,
    modifier: pickProperties(values.properties, values.modifier),
  });
}
