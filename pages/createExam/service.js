import {
    zlrequest
} from '../../utils/zlGraphql'
import { zlEncodeList } from '../../utils/util'
export const createExerciseRequset = (obj) => {
    // 我愿称这为graphql的天坑！！！
    const playLoad = JSON.stringify({
        query: `
        query createExercise{  createExercise(createrAvatarUrl:"${obj.createrAvatarUrl}",createrId:"${obj.createrId}",course_id:"${obj.course_id}",courseName:"${obj.courseName}",teacherName:"${obj.teacherName}",invitationCode:"${obj.invitationCode}",exerciseList:"${zlEncodeList(obj.exerciseList)}",exerciseName:"${obj.exerciseName}")
        {createrAvatarUrl,createrId,course_id,courseName,teacherName,invitationCode,}}       
        `
    })
    return zlrequest(playLoad, "POST")
}