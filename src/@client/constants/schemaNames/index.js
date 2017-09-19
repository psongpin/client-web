// @flow
import schema from '@client/schemas';

type $names = $ObjMapi<typeof schema, <K>(k: K)=>K>;

const names : $names = Object.keys(schema).reduce((finalResult, schemaName) => {
  finalResult[schemaName] = schemaName;
  return finalResult;
}, {});

module.exports = names;
