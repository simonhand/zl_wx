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
        query: `query { queryCourse(createrId:"${palyLoad}"){
                      _id,
                      createrId,
                      createrAvatarUrl,
                      courseName,
                      teacherName,
                      invitationCode,
                      students           
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
                    invitationCode
            }
            }
        `
    })
    return zlrequest(sql,"POST");
}

export const getStudentCourse = () => {

}