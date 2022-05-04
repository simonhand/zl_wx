import { zlrequest } from '../../utils/zlGraphql'
const app = getApp()
export const examIndex = (obj) => {
    const arr = obj.map((item) => "\""+item.invitationCode+"\"")
    const playLoad = JSON.stringify({
        query: `
        query examIndex {
            examIndex(invitationCodeList:[${arr.toString()}],userId:"${app.globalData.userInfo._id}") {
              _id
              exerciseName
              courseName
              teacherName
              createrAvatarUrl
              meta {
                createdAt
              }
            }
          }
        `
    })
   return zlrequest(playLoad,"POST")
}