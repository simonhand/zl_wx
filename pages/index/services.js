import { zlrequest } from '../../utils/zlGraphql'
const app = getApp()
export const examIndex = (obj) => {
    const arr = obj.map((item) => "\""+item.invitationCode+"\"")
    const playLoad = JSON.stringify({
        query: `
        query examIndex {
            examIndex(invitationCodeList:[${arr.toString()}],userId:"${app.globalData.userInfo._id}",from:"index") {
                exerciseCount
            }
          }
        `
    })
   return zlrequest(playLoad,"POST")
}

export const getNotifyByUser = (user) => {
    const arr = user.course.map((item) => "\"" + item.invitationCode + "\"")
    const palyLoad = JSON.stringify({
        query: `query getNotify{
            getNotify(invitationCodeList:[${arr.toString()}],userId:"${user._id}",from:"index"){
                NotifyCount
            }
        }`
    })
    return zlrequest(palyLoad, "POST")
}