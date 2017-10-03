// @flow
import { PageSelector } from '@client/utils/selectorUtils';
import Application from '@client/models/pages/Application';

const constants = require('@client/schemas/pages/constants');

class ApplicationPageSelector extends PageSelector {}

export default new ApplicationPageSelector(constants.applications, new Application());
