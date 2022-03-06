import {
    zlrequest
} from '../../utils/zlGraphql'
export const createClass = (palyLoad) => {
    const {
        createrAvatarUrl,
        createrId,
        courseName,
        teacherName,
        invitationCode
    } = palyLoad;
    const sql = JSON.stringify({
        query: `mutation {
            createCourse(post:{
            createrAvatarUrl:"${createrAvatarUrl}",
            createrId:"${createrId}",
            courseName:"${courseName}",
            teacherName:"${teacherName}",
            invitationCode:"${invitationCode}",
            }){
                createrAvatarUrl,
                createrId,
                courseName,
                teacherName,
                invitationCode,
            }
          }`
    })
    return zlrequest(sql, "POST");
}

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

export const addCourse = ({invitationCode,_id}) => {
    const sql = JSON.stringify({
        query:`
            query {
                addCourse(_id:"${_id}",invitationCode:"${invitationCode}"){
                    _id,
                    createrAvatarUrl,
                    createrId,
                    courseName,
                    teacherName,
                    invitationCode,
                    studentsNumber
            }
            }
        `
    })
    return zlrequest(sql,"POST");
}

export const getStudentCourse = (_id) => {
    const sql = JSON.stringify({
        query:`
        query queryCourse {             
            queryStudentCourse(_id:"${_id}"){
                    _id,
                createrId,
                createrAvatarUrl,
                courseName,
                teacherName,
                invitationCode,
                studentsNumber,
            }            
          }
          
        `
    })
    return zlrequest(sql,"POST");
}

export const deleteCourse = (userId,userType,courseId,invitationCode) => {
    const sql = JSON.stringify({
        query:`
        query queryCourse {             
            deleteCourse(userId:"${userId}",userType:${userType},courseId:"${courseId}",invitationCode:"${invitationCode}"){
                modifiedCount
            }          
          }
        `
    })
    return zlrequest(sql,"POST");
}