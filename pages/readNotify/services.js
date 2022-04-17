import {
    zlrequest
} from '../../utils/zlGraphql'

export const getNotifyByUser = (user) => {
    const arr = user.course.map((item) => "\"" + item.invitationCode + "\"")
    const palyLoad = JSON.stringify({
        query: `query getNotify{
            getNotify(invitationCodeList:[${arr.toString()}],userId:"${user._id}"){
                _id
                createrAvatarUrl,
                createrId,
                course_id,
                courseName,
                teacherName,
                invitationCode,
                textArea,
                imgList,
                meta{                  
                    createdAt
                }
            }
        }`
    })
    return zlrequest(palyLoad, "POST")
}

export const readNotify = (userId, notifyId) => {
    const playLoad = JSON.stringify({
        query: `query readNotify{
            readNotify(notifyId:"${notifyId}",userId:"${userId}"){
                _id
            }
        }`
    })
    return zlrequest(playLoad, "POST");
}