import {
    zlrequest
} from '../../utils/zlGraphql'
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
    zlrequest(playload, "POST").then( () => {
        // 涉及个人信息的更新需要更新缓存和全局标量
          // 更新全局标量
        app.globalData.userInfo = { ...app.globalData.userInfo, avatarUrl:postAvatarUrl}
        wx.setStorage({
            key:"user",
            encrypt:true,
            data:app.globalData.userInfo, avatarUrl
        })
        wx.switchTab({
            url: '../profile/profile',
          })
    } );
}