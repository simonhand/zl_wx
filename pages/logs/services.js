import {
    zlrequest
} from '../../utils/zlGraphql'

export const getTabTotal = (userId) => {
    const playLoad = JSON.stringify({
        query: `query getTabTotal{getTabTotal(userId:"${userId}"){
            exerciseCount
            notifyCount
            calcCount
        } } `
    })
    return zlrequest(playLoad, "POST");
}
export const getExerciseRecord = (userId) => {
    const playLoad = JSON.stringify({
        query: `query getExerciseRecord{getExerciseRecord(userId:"${userId}"){
            _id
            createrId
            createrAvatarUrl
            courseName
            exerciseId
            exercisesCorrectRecord
            exercisesScoreRecord
        }}`
    })
    return zlrequest(playLoad, "POSt")
}

export const getNotifyRecord = (userId, course) => {
    const arr = course.map((item) => "\"" + item.invitationCode + "\"")
    const palyLoad = JSON.stringify({
        query: `query getNotify{
            getNotify(invitationCodeList:[${arr.toString()}],userId:"${userId}",from:"record"){
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

export const getCalcRecord = (userId) => {
    const palyLoad = JSON.stringify({
        query: `query getCalcRecord{
            getCalcRecord(userId:"${userId}"){
                calcList,
                score,
                calcCount,
                timer,
                userId,
                calcType
            }
        }`
    })
    return zlrequest(palyLoad,"POST")
}