import {
    randomNum,
    randomNumBetween
} from "../../utils/random"


// 基础的
const level1 = {
    level_11: function () { //5以内加法
        var random1 = Math.round(Math.random() * 5);
        var random2 = Math.round(Math.random() * 5);
        var answer = random1 + random2
        var string = random1.toString();
        string += " + ";
        string += random2.toString();
        string += " = ";
        return { string,answer,useranswer:""}
    },
    level_12:function(){//5以内减法
        var random1=Math.round(Math.random()*5);
        var random2=Math.round(Math.random()*5);
        if(random1<random2){
            var random3=random1;
            random1=random2;
            random2=random3;
        }
        var answer=random1-random2;
        var string=random1.toString();
        string += " - ";
        string += random2.toString();
        string += " = ";
        return { string,answer,useranswer:""}
    },
}


// export const randomKey = (obj) => {
//     const symbolnum = randomNumBetween(0, 1);
//             let operand_1 = randomNum(2);
//             let operand_2 = randomNum(2);
//             // 这里防止减口算造成负数的结果
//             if (symbolnum === 1 && operand_1 < operand_2) {
//                 const temp = operand_2;
//                 operand_2 = operand_1;
//                 operand_1 = temp;
//             }
//             obj.setData({
//                 operand_1,
//                 operand_2,
//                 symbol: symbolnum,
//             });
//             let solvtion;
//             switch (symbolnum) {
//                 case 0:
//                     solvtion = operand_1 + operand_2;
//                     break;
//                 case 1:
//                     solvtion = operand_1 - operand_2;
//                     break;
//                 case 2:
//                     solvtion = operand_1 * operand_2;
//                     break;
//                 case 3:
//                     solvtion = operand_1 / operand_2;
//                     break;
//                 default:
//                     break;
//             }
//         return {
//             solvtion
//         }
// }