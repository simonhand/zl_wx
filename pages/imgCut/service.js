import {
  zlrequest
} from '../../utils/zlGraphql'
import {
  getAccessToken
} from "../../commonservice/getAccessToken"
const app = getApp()
export const graphqlSetAvatar = async (avatarUrl) => {
  const postAvatarUrl = 'https://' + avatarUrl
  const playload = JSON.stringify({
    query: `
        mutation {
            updateUserInfo(post:{
              _id:"${app.globalData.userInfo._id}",
              avatarUrl:"${postAvatarUrl}"
            }){
                uname
            }
          }
        `
  })
  zlrequest(playload, "POST").then(() => {
    // 涉及个人信息的更新需要更新缓存和全局标量
    // 更新全局标量
    app.globalData.userInfo = {
      ...app.globalData.userInfo,
      avatarUrl: postAvatarUrl
    }
    wx.setStorage({
      key: "user",
      encrypt: true,
      data: app.globalData.userInfo,
      avatarUrl
    })
    wx.switchTab({
      url: '../profile/profile',
    })
  });
}
export const ocrImg = (img_url) => {
  return getAccessToken().then((res) => {
    console.log(res);
    const enUrl = encodeURI(img_url)
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.weixin.qq.com/cv/ocr/comm?img_url=${enUrl}&access_token=${res.data.access_token}`,
        // data: {
        //   img_url:encodeURI(img_url),
        //   access_token: res.data.access_token,
        // },
        method:"POST",
        success(res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      })
    }).then((res) => {
      return new Promise((resolve,reject) => {
        resolve(res)
      })
    })
  })
}