// @flow
// $FlowFixMe
import erschemaStandardizeEntity from 'erschema-redux-immutable/schemas';
import { Record } from 'immutable';

class DefaultPageModel extends Record({ id: '' }) {}
export function standardizePage(
  pageName: string,
  { properties = {}, Model = DefaultPageModel, relationships }: Object
) {
  return erschemaStandardizeEntity({
    properties: { ...properties, id: '' },
    Model,
    relationships,
    idFunc: () => pageName,
    modifier: ent => ({ id: pageName, ...ent }),
  });
}

export const standardizeEntity = erschemaStandardizeEntity;

export const nullToUndefined = props => {
  const propsObject = props.reduce((finalResult, prop) => {
    finalResult[prop] = true;
    return finalResult;
  }, {});
  return ent => {
    return Object.keys(ent).reduce((finalResult, prop) => {
      if (ent[prop] !== null || !propsObject[prop]) {
        finalResult[prop] = ent[prop];
      }
      return finalResult;
    }, {});
  };
};
