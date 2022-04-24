const app = getApp()

export const  updateUserInfo = (userInfo) => {
    wx.setStorage({
        key:"user",
        data:userInfo,
        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success(){
          app.globalData.userInfo = userInfo
        }
    })
}

export const updateTeacherCoursee = () => {
  
}

export const getWxStorage = (key) => {
  return new Promise((resolve,reject) => {
    wx.getStorage({
      key,
      encrypt:true,
      success(res){
        resolve(res)
      },
      fail(e){
        reject(e)
      }
    })
  })
}