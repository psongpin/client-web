// @flow
import { Services } from '@client/utils/serviceUtils';

class OauthServices extends Services {
  getGoogleAuthUrl = () => this.get('google_auth_url');
  getLinkedInAuthUrl = () => this.get('linked_in_auth_url');
}

export default new OauthServices('oauth');
