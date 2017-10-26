// @flow
import schema from './';

type $constants = $ObjMapi<typeof schema, <K>(k: K) => K>;

const constants: $constants = Object.keys(schema).reduce((finalResult, key) => {
  finalResult[key] = key;
  return finalResult;
}, {});

module.exports = constants;
