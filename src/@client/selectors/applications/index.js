// @flow
import Selector from '@client/utils/selectorUtils';
import Application from '@client/models/Application';

const { applications } = require('@client/schemas/constants');

class ApplicationSelectors extends Selector {
}

export default new ApplicationSelectors(applications, new Application());
