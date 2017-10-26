// @flow
import { PageSelector } from '@client/utils/selectorUtils';
import Home from '@client/models/pages/Home';

const { home } = require('@client/schemas/pages/constants');

class MyPublicationPageSelector extends PageSelector {}

export default new MyPublicationPageSelector(home, new Home());
