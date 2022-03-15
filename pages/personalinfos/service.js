import {
    zlrequest
} from '../../utils/zlGraphql'
export const updateUserInfo = ({
    _id,
    avatarUrl,
    userType,
    realName,
    nickName,
    age,
    grade,
    gender,
    phone
}) => {
    const playLoad = JSON.stringify({
        query: ` query updateUserInfomation{
        updateUserInfomation(_id:"${_id}",avatarUrl:"${avatarUrl}",userType:${userType},realName:"${realName}",nickName:"${nickName}",age:"${age}",grade:"${grade}",gender:"${gender}",phone:"${phone}"){
            _id,
      uname,
      pwd,
      utoken,
      class,
      classNo,
      nickName,
      realName,
      avatarUrl,
      openId,
      userType,
      isWxUser,
      gender,
      grade,
      phone,
      age,
      course {
        invitationCode
      }
    }  }
        `
    })
    return zlrequest(playLoad,"POST");
}