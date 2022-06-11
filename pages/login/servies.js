import { zlMessage  } from '../../components/Iview/base/index'
import { updateUserInfo } from '../../utils/updateWxstorage'
import {zlrequest } from '../../utils/zlGraphql'
const app = getApp()
export const loginUser = ({loginuname,loginpwd},page) => {
    const payload = JSON.stringify({
        query:`
        query loginuser {
            loginuser(uname:"${loginuname}",pwd:"${loginpwd}"){
             uname
             pwd
             classNo
             _id
             nickName
             avatarUrl
             openId
             isWxUser
             gender
             grade
             phone
             age
             userType
             realName
             course {
              invitationCode
             }
            }
          }
        `
      })
      zlrequest(payload,"POST").then((res) => {
          const userInfo = res.data.data.loginuser;
          if (!userInfo) {
              // 登录失败的处理
            zlMessage (page,{
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
              success(){
                app.globalData.userInfo = userInfo
              }
          })
          zlMessage (page,{
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

export const registerUser = ({registeruname = "",registerpwd ="",hasRegister=false,openid="",nickName="",avatarUrl="",isWxUser=false},page) => {
    if (hasRegister) {
        zlMessage (page,{
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
              openId:"${openid}",
              nickName:"${nickName}",
              avatarUrl:"${avatarUrl}",
              isWxUser:${isWxUser}
              realName:"",
              age:"",
              grade:"",
              gender:"",
              phone:""
            }){
                uname,
                pwd,
                _id,
                openId,
                nickName,
                avatarUrl,
                isWxUser,
                userType,
                course { invitationCode }
            }
          }
        `
      })
      zlrequest(payload,"POST").then((res) => {
          const userInfo = res.data.data.setUser;
          
          console.log("register",userInfo);
          // 注册成功后缓存用户数据
         updateUserInfo(userInfo);
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
      query {
          checkuser(uname:"${userInputName}",openId:"${userOpenId}"){
           uname,
           _id,
           openId,
           nickName,
           realName,
           avatarUrl,
           isWxUser,
           gender,
           grade,
           phone,
           age,
           userType,
           course{
            invitationCode
           }
          }
        }
      `
    })
  await zlrequest(payload,"POST").then((res) => {
    console.log(res);
      const userInfo = res.data.data.checkuser;
      console.log("userInfo",userInfo);
      if (!!userInfo) {
        user = userInfo;
      }
  }).catch((e) => {
    console.log("error",e);
  })
  return user
}

export const getOpenId = ({code,appid,secret}) => {
 const playLoad = JSON.stringify({
     query:`
     {
        getOpenId(code:"${code}"){
            openid,
        }
      }
     `
    })
    return zlrequest(playLoad,"POST")
}