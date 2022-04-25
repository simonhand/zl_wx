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