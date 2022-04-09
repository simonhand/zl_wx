import {
    zlrequest
} from '../../utils/zlGraphql'

export const getExam = (examId) => {
    const palyLoad = JSON.stringify({
        query:`
        query getExam {
            getExam(id:"${examId}"){
              _id
              createrAvatarUrl
              createrId
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