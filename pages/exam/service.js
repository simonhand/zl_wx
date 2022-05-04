import {
    zlrequest
} from '../../utils/zlGraphql'
import { zlEncodeList } from '../../utils/util'
export const getExam = (examId,from) => {
    const palyLoad = JSON.stringify({
        query:`
        query getExam {
            getExam(id:"${examId}", ${from==='record'?'from:"record"':''}){
              _id
              exerciseName
              createrAvatarUrl
              createrId
              course_id
              courseName
              exercisesCorrectRecord
              ${from==='record'?'userInputKeyList':''}
              exerciseList {
                iscorrectExerciseType
                textArea
                imgList
                keyList{
                  keyIndex
                  keyValue
                  trueKey
                }
                exercisesType
                exercisesIndex
              }
              meta {
                createdAt
              }
            }
          }
        `
    })
    return zlrequest(palyLoad,"POST")
}   

export const submitExam = (obj) => {
  const { courseName,course_id,createrAvatarUrl,createrId,exerciseId,exercisesCorrectRecord,exercisesScoreRecord,userInputKeyList,userId,exerciseName} = obj;
  const palyLoad = JSON.stringify({
    query:`query submitExercise{
      submitExercise(courseName:"${courseName}",createrId:"${createrId}",createrAvatarUrl:"${createrAvatarUrl}",userId:"${userId}",course_id:"${course_id}",exerciseId:"${exerciseId}",exercisesScoreRecord:${exercisesScoreRecord},userInputKeyList:"${zlEncodeList(userInputKeyList)}",exercisesCorrectRecord:"${zlEncodeList(exercisesCorrectRecord)}",exerciseName:"${exerciseName}"){
        _id
      }
    }
    `
  })
  zlrequest(palyLoad,"POST");
}
