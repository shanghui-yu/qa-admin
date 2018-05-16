import fetch from './ajax'

export const DEBUG = false                  // 是否开发模式
const HTTP_DEV = 'http://www.vr0101.com' // 测试地址

const HTTPS = 'http://www.vr0101.com' // 正式地址

const URLS = DEBUG ? HTTP_DEV : HTTPS
// const URLS = '/bx'
class XHR {
  // 获取用户信息
  getUserList (json) {
    return fetch({
      url: `${URLS}/getUserList`,
      body: json,
      type: 'GET'
    })
  }
  // 用户分布
  getUserTotalByProvince (json) {
    return fetch({
      url: `${URLS}/getUserTotalByProvince`,
      body: json,
      type: 'GET'
    })
  }
}
export default new XHR()
