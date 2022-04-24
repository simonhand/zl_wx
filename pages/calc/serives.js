import {
    zlrequest
} from '../../utils/zlGraphql'
import { zlEncodeList } from '../../utils/util'
export const submitCalc = (obj) => {
    const  {
        calcList,
        score,
        calcCount,
        timer,
        userId
    } = obj
    const palyLoad = JSON.stringify({
        query: `
            query submitCalc{submitCalc(calcList:"${zlEncodeList(calcList)}",score:${score},calcCount:${calcCount},timer:"${zlEncodeList(timer)}",userId:"${userId}"){
                userId
            }}
        `
    })
    return zlrequest(palyLoad,"POST");
}