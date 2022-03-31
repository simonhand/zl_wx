import { zlrequest } from '../../utils/zlGraphql'

export const examIndex = (obj) => {
    const arr = obj.map((item) => "\""+item.invitationCode+"\"")
    const playLoad = JSON.stringify({
        query: `
        query examIndex {
            examIndex(invitationCodeList:[${arr.toString()}]) {
              courseName
              teacherName
            }
          }
        `
    })
    zlrequest(playLoad,"POST")
}