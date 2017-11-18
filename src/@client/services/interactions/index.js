// @flow
import { prefetch } from '../../utils/fetchUtils';

export default {
  create: (payload: Object) => {
    prefetch(
      `${process.env.API_CONNECTION ||
        'https://menternship.org/api'}/interactions`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  },
};
