import { zlrequest } from '../../utils/zlGraphql'

export const getTabTotal = (userId) => {
    const playLoad = JSON.stringify({
        query : `query getTabTotal{getTabTotal(userId:"${userId}"){
            exerciseCount
            notifyCount
            calcCount
        } } `
    })
    return zlrequest(playLoad,"POST");
}
export const getExerciseRecord = (userId) => {
    const playLoad = JSON.stringify({
        query:`query getExerciseRecord{getExerciseRecord(userId:"${userId}"){
            _id
            createrId
            createrAvatarUrl
            courseName
            exerciseId
            exercisesCorrectRecord
            exercisesScoreRecord
        }}`
    })
    return zlrequest(playLoad,"POSt")
}

export const getNotifyRecord = (userId) => {

}

export const getCalcRecord = (userId) => {

}