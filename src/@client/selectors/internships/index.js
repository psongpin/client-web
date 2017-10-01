// @flow
import Selector from '@client/utils/selectorUtils';
import Internship from '@client/models/Internship';

const { internships } = require('@client/schemas/constants');

class InternshipSelectors extends Selector {
}

export default new InternshipSelectors(internships, new Internship());
