import {
  appScret
} from "../config/secret"

const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type:"client_credential",
        appid: appScret.appid,
        secret: appScret.secret
      },
      method: "GET",
      success(res) {
        resolve(res)
      },
      fail(res){
        reject(res)
      }
    })
  })
}

export { getAccessToken }