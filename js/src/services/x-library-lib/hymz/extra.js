import { request_post, request_get } from 'services/common/request'

class Extra {
  async getHelpInfo() {
    return request_get('/api/help')
  }
  /**
   * content
   */
  async setHelpInfo(data) {
    return request_post('/api/help', data)
  }
}

export default new Extra()
