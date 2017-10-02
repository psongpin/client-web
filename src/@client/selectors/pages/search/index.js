// @flow
import { PageSelector } from '@client/utils/selectorUtils';
import Search from '@client/models/pages/Search';

const { search } = require('@client/schemas/pages/constants');

class SearchPageSelector extends PageSelector {

}

export default new SearchPageSelector(search, new Search());
