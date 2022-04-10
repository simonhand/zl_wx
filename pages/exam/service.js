import {
    zlrequest
} from '../../utils/zlGraphql'
import { zlEncodeList } from '../../utils/util'
export const getExam = (examId) => {
    const palyLoad = JSON.stringify({
        query:`
        query getExam {
            getExam(id:"${examId}"){
              _id
              createrAvatarUrl
              createrId
              course_id
              courseName
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
  const { courseName,course_id,createrAvatarUrl,createrId,exerciseId,exercisesCorrectRecord,exercisesScoreRecord,userInputKeyList,userId} = obj;
  const palyLoad = JSON.stringify({
    query:`query submitExercise{
      submitExercise(courseName:"${courseName}",createrId:"${createrId}",createrAvatarUrl:"${createrAvatarUrl}",userId:"${userId}",course_id:"${course_id}",exerciseId:"${exerciseId}",exercisesScoreRecord:${exercisesScoreRecord},userInputKeyList:"${zlEncodeList(userInputKeyList)}",exercisesCorrectRecord:"${zlEncodeList(exercisesCorrectRecord)}"){
        _id
      }
    }
    `
  })
  zlrequest(palyLoad,"POST");
}