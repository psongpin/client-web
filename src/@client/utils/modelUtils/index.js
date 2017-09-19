// @flow
import { Record } from 'immutable';

export function PageModel(input?: Object = {}) {
  return Record({ id: '', ...input });
}

export function changeInput<$input: Object>(
  input: $input,
  inputMapping: {[key: $Keys<$input>]: Function},
) {
  return Object.keys(inputMapping).reduce((finalResult, key) => {
    // $FlowFixMe
    finalResult[key] = inputMapping[key](input[key]);
    return finalResult;
  }, input);
}
