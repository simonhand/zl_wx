import {
    zlrequest
} from '../../utils/zlGraphql'
const app = getApp()
export const getTabTotal = (userId,userType) => {
    const playLoad = JSON.stringify({
        query: `query getTabTotal{getTabTotal(userId:"${userId}",userType:${userType}){
            exerciseCount
            notifyCount
            calcCount
        } } `
    })
    return zlrequest(playLoad, "POST");
}
export const getExerciseRecord = (userId,skip,userType) => {
    const playLoad = JSON.stringify({
        query: `query getExerciseRecord{getExerciseRecord(userId:"${userId}",skip:${skip},userType:${userType}){
            _id
            createrId
            exerciseName
            createrAvatarUrl
            courseName
            course_id
            exerciseId
            exercisesCorrectRecord
            exercisesScoreRecord
            meta {
                createdAt
            }
        }}`
    })
    return zlrequest(playLoad, "POSt")
}

export const getNotifyRecord = (userId, course,skip,userType) => {
    const arr = course.map((item) => "\"" + item.invitationCode + "\"")
    const palyLoad = JSON.stringify({
        query: `query getNotify{
            getNotify(invitationCodeList:[${arr.toString()}],userId:"${userId}",from:"record",skip:${skip},userType:${userType}){
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

export const getCalcRecord = (userId,skip) => {
    const palyLoad = JSON.stringify({
        query: `query getCalcRecord{
            getCalcRecord(userId:"${userId}",skip:${skip}){
                calcList,
                score,
                calcCount,
                timer,
                userId,
                calcType,
                _id
            }
        }`
    })
    return zlrequest(palyLoad,"POST")
}

export const deleteCalcRecord = (calcId) => {
    const palyLoad = JSON.stringify({
        query: `query deleteCalcRecord{
            deleteCalcRecord(calcId:"${calcId}"){
               _id
            }
        }`
    });
    return zlrequest(palyLoad,"POST");
}

export const getDoneExerciseStudents = (course_id,exerciseRecordId) => {
    const palyLoad = JSON.stringify({
        query: `query getDoneExerciseStudents{
            getDoneExerciseStudents(course_id:"${course_id}",exerciseRecordId:"${exerciseRecordId}"){
               _id
               uname
               nickName
               realName
               avatarUrl
            }
        }`
    });
    return zlrequest(palyLoad,"POST");
}

export const getReadNotifyStudents = (notifyId) => {
    const palyLoad = JSON.stringify({
        query: `query getReadNotifyStudents{
            getReadNotifyStudents(notifyId:"${notifyId}"){
               _id
               uname
               nickName
               realName
               avatarUrl
            }
        }`
    });
    return zlrequest(palyLoad,"POST");
}