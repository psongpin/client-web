// @flow
import Selector from '@client/utils/selectorUtils';
import Internship from '@client/models/Internship';
import { get } from 'lodash';

const { internships } = require('@client/schemas/constants');

class InternshipSelectors extends Selector {
  getIdFromLocation = (state, props)=>get(props, 'params.internshipId')
}

export default new InternshipSelectors(internships, new Internship());
