import { zlrequest } from '../../utils/zlGraphql'

export const getNotifyByUser = (user) => {
    const arr = user.course.map((item) => "\""+item.invitationCode+"\"")
    const palyLoad = JSON.stringify({
        query: `query getNotify{
            getNotify(invitationCodeList:[${arr.toString()}],userId:"${user._id}"){
                createrAvatarUrl,
                createrId,
                course_id,
                courseName,
                teacherName,
                invitationCode,
                textArea,
                imgList,
            }
        }`
    })
    return zlrequest(palyLoad,"POST")
}