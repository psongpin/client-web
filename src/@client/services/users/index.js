// @flow
import { Services } from '@client/utils/serviceUtils';

class UserServices extends Services {
  checkEmail = (email: string) => this.post('check_email', { email })
  checkUsername = (username: string) => this.post('check_username', { username })
  getUsers = (userIds) => this.post('get_users', { userIds })
  getGoogleAuthUrl = ()=>this.get('google_auth_url')
  getLoginToken = (email)=>this.get(`login_token/${email}`)
  createUsername = (id, token, username)=>this.post(`${id}/create_username/${token}`, { username })
}

export default new UserServices('users');
