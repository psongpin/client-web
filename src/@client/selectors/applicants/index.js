// @flow
import Selector from '@client/utils/selectorUtils';
import Applicant from '@client/models/Applicant';

const { applicants } = require('@client/schemas/constants');

class ApplicantSelectors extends Selector {
}

export default new ApplicantSelectors(applicants, new Applicant());
