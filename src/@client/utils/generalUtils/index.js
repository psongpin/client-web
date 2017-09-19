// @flow
type $constants<X> = $ObjMapi<X, <K>(k: K)=>K>;

export function getMirror<$schema: *>(schema: $schema): $constants<$schema> {
  return Object.keys(schema).reduce((finalResult, key) => {
    finalResult[key] = key;
    return finalResult;
  },
  {});
};
