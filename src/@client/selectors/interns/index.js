// @flow
import Selector from '@client/utils/selectorUtils';
import Intern from '@client/models/Intern';

const schemaConstants = require('@client/schemas/constants');

class InternSelectors extends Selector {}

export default new InternSelectors(schemaConstants.interns, new Intern());
