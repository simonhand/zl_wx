import { $Message  } from '../../components/Iview/base/index'
import {zlrequest } from '../../utils/zlGraphql'
export const loginUser = ({loginuname,loginpwd}) => {
    const payload = JSON.stringify({
        query:`
        query loginuser {
            loginuser(uname:"${loginuname}",pwd:"${loginpwd}"){
             uname
             pwd
             classNo
             _id
            }
          }
        `
      })
      zlrequest(payload,"POST").then((res) => {
          const userInfo = res.data.data.loginuser;
          if (!userInfo) {
              // 登录失败的处理
            $Message ({
                type:'error',
                content:"用户名或密码错误",
                mask: false
            })
            return;
          }
          // 登录成功后缓存用户数据
          wx.setStorage({
              key:"user",
              data:userInfo,
              encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
          })
          $Message ({
            type:'success',
            content:"登录成功",
            mask: false
        })
         setTimeout(() => {
            wx.switchTab({
                url: '../../pages/index/index',
              })
         },500);
        return userInfo;
      })
}

export const registerUser = ({registeruname = "",registerpwd ="",hasRegister=false,openid="",nickName="",avatarUrl="",isWxUser=false}) => {
    if (hasRegister) {
        $Message ({
            type:"error",
            content:"该用户已经存在"
        })
        return;
    }
    const payload = JSON.stringify({
        query:`
        mutation {
            setUser(post:{
              uname: "${registeruname}",
              pwd:"${registerpwd}",
              openid:"${openid}",
              nickName:"${nickName}",
              avatarUrl:"${avatarUrl}",
              isWxUser:${isWxUser}
            }){
                uname,
                pwd,
                _id,
                openid,
                nickName,
                avatarUrl,
                isWxUser
            }
          }
        `
      })
      zlrequest(payload,"POST").then((res) => {
          const userInfo = res.data.data.setUser;
          console.log("register",userInfo);
          // 注册成功后缓存用户数据
          wx.setStorage({
              key:"user",
              data:userInfo,
              encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
          })
          $Message ({
              type:"success",
              content:'注册成功'
          })
          setTimeout(()=> {
            wx.switchTab({
                url: '../../pages/index/index',
              })
          },500) 
      })
}

export const checkUser = async ({userInputName="",userOpenId=""}) => {
  let user = null;
  const payload = JSON.stringify({
      query:`
      query loginuser {
          checkuser(uname:"${userInputName}",openId:"${userOpenId}"){
           uname
           nickName
           uname,
           _id,
           openid,
           nickName,
           avatarUrl,
           isWxUser
          }
        }
      `
    })
  await zlrequest(payload,"POST").then((res) => {
      const userInfo = res.data.data.checkuser;
      console.log("userInfo",userInfo);
      if (!!userInfo) {
        user = userInfo;
      }
  })
  return user
}