/**
 * 微信小程序历史更新日志关于Promise的相关信息
 * 0.11.112200开发工具 移除了Promise支持
 * 1.6.0基础库更新 修复 框架 iOS8 下 Promise 不会执行 resolve 的问题
 */
let Promise = require('../libs/es6-promise.js')
let app = getApp()

// 扩展ES6的Promise对象，增加finally方法
// Promise.prototype.finally = function(callback) {
//   var Promise = this.constructor;
//   return this.then(
//     function(value) {
//       Promise.resolve(callback()).then(
//         function() {
//           return value;
//         }
//       );
//     },
//     function(reason) {
//       Promise.resolve(callback()).then(
//         function() {
//           throw reason;
//         }
//       );
//     }
//   );
// }

export default {
  /**
   * 发送 post 请求
   */
  post: function(url, params) {
    let promise = new Promise(function(resolve, reject) {
      // 补全前缀
      if (url.indexOf('://') === -1) {
        url = app.globalData.appConfig.service + url
      }
      let defaultHeader = app.globalData.defaultHeader
      let header = Object.assign(defaultHeader, params && params.header || {})
      wx.request({
        method: 'POST',
        url: url,
        data: params,
        header: header,
        success: function(res) {
          if (res.data.stateCode === app.constants.STATE_CODE_SUCCESS) {
            resolve(res.data, res.statusCode, res.header)
          } else {
            reject(res)
          }
        },
        fail: function(error) {
          reject(error)
        },
        complete: function() {

        }
      })
    })
    return promise
  }
}
