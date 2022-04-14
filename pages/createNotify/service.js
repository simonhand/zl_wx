import {
    zlrequest
} from '../../utils/zlGraphql'
import { zlEncodeList } from '../../utils/util'
export const createNotify = (obj) => {
    // 我愿称这为graphql的天坑！！！
    const playLoad = JSON.stringify({
        query: `
        query createNotify{  createNotify(createrAvatarUrl:"${obj.createrAvatarUrl}",createrId:"${obj.createrId}",course_id:"${obj._id}",courseName:"${obj.courseName}",teacherName:"${obj.teacherName}",invitationCode:"${obj.invitationCode}",imgList:"${zlEncodeList(obj.imgList)}",textArea:"${obj.textArea}")
        {createrAvatarUrl,createrId,course_id,courseName,teacherName,invitationCode,}}       
        `
    })
    return zlrequest(playLoad, "POST")
}