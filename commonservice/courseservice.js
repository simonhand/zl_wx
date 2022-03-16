import {
    zlrequest
} from '../utils/zlGraphql.js'
// 在myClass,index 引用
export const getTeacherCourse = (palyLoad) => {
    const sql = JSON.stringify({
        query: `query { 
                      queryCourse(createrId:"${palyLoad}"){
                      _id,
                      createrId,
                      createrAvatarUrl,
                      courseName,
                      teacherName,
                      invitationCode,
                      studentsNumber      
          } }`
    })
    return zlrequest(sql,"POST");
}