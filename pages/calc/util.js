// 基础的
export const level1 = {
    level_1: function () { //5以内加法
        var random1 = Math.round(Math.random() * 5);
        var random2 = Math.round(Math.random() * 5);
        var answer = (random1 + random2).toString();
        var string = random1.toString();
        string += " + ";
        string += random2.toString();
        string += " = ";
        return {
            string,
            answer,
            useranswer: ""
        }
    },
    level_2: function () { //5以内减法
        var random1 = Math.round(Math.random() * 5);
        var random2 = Math.round(Math.random() * 5);
        if (random1 < random2) {
            var random3 = random1;
            random1 = random2;
            random2 = random3;
        }
        var answer = (random1 - random2).toString();
        var string = random1.toString();
        string += " - ";
        string += random2.toString();
        string += " = ";
        return {
            string,
            answer,
            useranswer: ""
        }
    },
    level_3: function () { //6~10加法
        var random1 = Math.round(Math.random() * 10);
        while (random1 < 6) {
            random1 = Math.round(Math.random() * 10);
        }
        var random2 = Math.round(Math.random() * 10);
        while (random2 < 6) {
            random2 = Math.round(Math.random() * 10);
        }
        var answer = (random1 + random2).toString();
        var string = random1.toString();
        string += " + ";
        string += random2.toString();
        string += " = ";
        return {
            string,
            answer,
            useranswer: ""
        }
    },
    level_4: function () { //6~10减法
        var random1 = Math.round(Math.random() * 10);
        while (random1 < 6) {
            random1 = Math.round(Math.random() * 10);
        }
        var random2 = Math.round(Math.random() * 10);
        while (random2 < 6) {
            random2 = Math.round(Math.random() * 10);
        }
        if (random1 < random2) {
            var random3 = random1;
            random1 = random2;
            random2 = random3;
        }
        var answer = (random1 - random2).toString();
        var string = random1.toString();
        string += " - ";
        string += random2.toString();
        string += " = ";
        return {
            string,
            answer,
            useranswer: ""
        }
    },
    level_5: function () { //10以内的连加
        var random1 = Math.round(Math.random() * 10);
        var random2 = Math.round(Math.random() * 10);
        var random3 = Math.round(Math.random() * 10);
        var answer = random1 + random2 + random3;
        var string = random1.toString();
        string += " + ";
        string += random2.toString();
        string += " + ";
        string += random3.toString();
        string += " = ";
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_6: function () { //10以内的连减
        var random1 = Math.round(Math.random() * 10);
        var random2 = Math.round(Math.random() * 10);
        var random3 = Math.round(Math.random() * 10);
        var answer = random1 - random2 - random3;
        while (answer < 0) {
            random1 = Math.round(Math.random() * 10);
            random2 = Math.round(Math.random() * 10);
            random3 = Math.round(Math.random() * 10);
            answer = random1 - random2 - random3;
        }
        var string = random1.toString();
        string += " - ";
        string += random2.toString();
        string += " - ";
        string += random3.toString();
        string += " = ";
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_7: function () { //10以内的连加减
        var random1 = Math.round(Math.random() * 10);
        var random2 = Math.round(Math.random() * 10);
        var random3 = Math.round(Math.random() * 10);
        var op = Math.round(Math.random());
        switch (op) {
            case 0:
                var answer = random1 + random2 - random3;
                while (answer < 0) {
                    random1 = Math.round(Math.random() * 10);
                    random2 = Math.round(Math.random() * 10);
                    random3 = Math.round(Math.random() * 10);
                    answer = random1 - random2 - random3;
                }
                var string = random1.toString();
                string += " + ";
                string += random2.toString();
                string += " - ";
                string += random3.toString();
                string += " = ";
                break;
            case 1:
                var answer = random1 - random2 + random3;
                while (answer < 0) {
                    random1 = Math.round(Math.random() * 10);
                    random2 = Math.round(Math.random() * 10);
                    random3 = Math.round(Math.random() * 10);
                    answer = random1 - random2 - random3;
                }
                var string = random1.toString();
                string += " - ";
                string += random2.toString();
                string += " + ";
                string += random3.toString();
                string += " = ";
                break;
        }
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_8: function () { //10~20加减
        var random1 = Math.round(Math.random() * 20);
        while (random1 < 10) {
            random1 = Math.round(Math.random() * 20);
        }
        var random2 = Math.round(Math.random() * 20);
        while (random2 < 10) {
            random2 = Math.round(Math.random() * 20);
        }
        var op = Math.round(Math.random());
        switch (op) {
            case 0:
                var answer = random1 + random2;
                var string = random1.toString();
                string += " + ";
                string += random2.toString();
                string += " = ";
                break;
            case 1:
                var answer = random1 - random2;
                while (answer < 0) {
                    random1 = Math.round(Math.random() * 20);
                    while (random1 < 10) {
                        random1 = Math.round(Math.random() * 20);
                    }
                    random2 = Math.round(Math.random() * 20);
                    answer = random1 - random2;
                }
                var string = random1.toString();
                string += " - ";
                string += random2.toString();
                string += " = ";
                break;
        }
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
}
// 进阶
export const level2 = {
    level_1: function () { //两位数加两位数的加法（和在一百以内的）
        var randnum1 = 0; //第一个加数 
        var number1; //第一个加数 取整
        var randnum2 = 0; //第二个加数
        var number2; //第二个加数 取整
        while (randnum1 < 10)
            randnum1 = Math.random() * 89; //生成10-89的随机数
        number1 = Math.round(randnum1);
        while (randnum2 < 10)
            randnum2 = Math.random() * (99 - number1); //生成10-89的随机数
        number2 = Math.round(randnum2);
        const string = number1.toString() + "+" + number2.toString() + "="; //题目字符串
        const answer = number1 + number2; //答案
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_2: function () { //两位数减两位数的减法
        var randnum1 = 0; //第一个加数 
        var number1; //第一个加数 取整
        var randnum2 = 0; //第二个加数
        var number2; //第二个加数 取整
        while (randnum1 < 10)
            randnum1 = Math.random() * 99; //生成10-99的随机数
        number1 = Math.round(randnum1);
        while (randnum2 < 10)
            randnum2 = Math.random() * number1; //生成10-number1的随机数
        number2 = Math.round(randnum2);
        const string = number1.toString() + "-" + number2.toString() + "="; //题目字符串
        const answer = number1 - number2; //答案
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_3: function () { //9以内的乘法口诀
        var randnum1 = 0; //乘数
        var number1; //第一个乘数 取整
        var randnum2 = 0; //第二个乘数
        var number2; //第二个乘数 取整
        randnum1 = Math.random() * 10; //生成0-10的随机数
        number1 = Math.round(randnum1);
        randnum2 = Math.random() * 10; //生成0-10的随机数
        number2 = Math.round(randnum2);
        const string = number1.toString() + "×" + number2.toString() + "="; //题目字符串
        const answer = number1 * number2; //答案
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_4: function () { //9以内的除法口诀
        var randnum1 = 0; //被除数
        var number1; //被除数 取整
        var randnum2 = -1; //除数
        var number2; //除数 取整
        while (randnum1 < 3)
            randnum1 = Math.random() * 10; //生成1-10的随机数
        number1 = Math.round(randnum1);
        var s = this.primeFactors(number1);
        while (randnum2 < 0)
            randnum2 = Math.random() * (s.length - 1); //生成1-s.length的随机数
        randnum2 = Math.round(randnum2);
        number2 = s[randnum2];
        const string = number1.toString() + "÷" + number2.toString() + "="; //题目字符串
        const answer = number1 / number2; //答案
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_5: function () { //乘法和加法混合
        var randnum1 = 0;
        var number1;
        var randnum2 = 0;
        var number2;
        var randnum3 = 0;
        var number3;
        var number4;
        randnum1 = Math.random() * 10; //生成0-9的随机数
        number1 = Math.round(randnum1);
        randnum2 = Math.random() * 10; //生成0-9的随机数
        number2 = Math.round(randnum2);
        randnum3 = Math.random() * 100; //生成0-99的随机数
        number3 = Math.round(randnum3);
        var m = Math.random();
        number4 = Math.round(m); //题目结构随机
        let string
        if (number4 == 0)
            string = number1.toString() + "×" + number2.toString() + "+" + number3.toString() + "="; //题目字符串
        else
            string = number3.toString() + "+" + number1.toString() + "×" + number2.toString() + "="; //题目字符串
        const answer = number1 * number2 + number3; //答案
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_6: function () { //乘法和减法混合
        var randnum1 = 0;
        var number1;
        var randnum2 = 0;
        var number2;
        var randnum3 = 0;
        var number3;
        randnum1 = Math.random() * 10; //生成0-9的随机数
        number1 = Math.round(randnum1);
        randnum2 = Math.random() * 10; //生成0-9的随机数
        number2 = Math.round(randnum2);
        randnum3 = Math.random() * (number1 * number2); //生成0-99的随机数
        number3 = Math.round(randnum3);
        const string = number1.toString() + "×" + number2.toString() + "-" + number3.toString() + "="; //题目字符串
        const answer = number1 * number2 - number3; //答案
        return {
            string,
            answer: answer.toString(),
            useranswer: ""
        }
    },
    level_7: function () { //除法和加法混合
        var randnum1 = 0; //被除数
        var number1; //被除数 取整
        var randnum2 = 0; //除数
        var number2; //除数 取整
        var randnum3 = 0;
        var number3;
        while (randnum1 < 3)
            randnum1 = Math.random() * 100; //生成0-99的随机数
        number1 = Math.round(randnum1);
        var s = this.primeFactors(number1);
        while (randnum2 <= 0)
            randnum2 = Math.random() * (s.length - 1); //生成0-s.length的随机数
        randnum2 = Math.round(randnum2);
        number2 = s[randnum2];
        randnum3 = Math.random() * 100; //生成0-99的随机数
        number3 = Math.round(randnum3);
        const string = number1.toString() + "÷" + number2.toString() + "+" + number3.toString() + "="; //题目字符串
        const answer = number1 / number2 + number3; //答案
        return { string,answer:answer.toString(),useranswer:""}
    },
    level_8: function () { //除法和减法混合
        var randnum1 = 0; //被除数
        var number1; //被除数 取整
        var randnum2 = 0; //除数
        var number2; //除数 取整
        var randnum3 = 0;
        var number3;
        while (randnum1 < 3)
            randnum1 = Math.random() * 100; //生成0-99的随机数
        number1 = Math.round(randnum1);
        var s = this.primeFactors(number1);
        while (randnum2 <= 0)
            randnum2 = Math.random() * (s.length - 1); //生成0-s.length的随机数
        randnum2 = Math.round(randnum2);
        number2 = s[randnum2];
        randnum3 = Math.random() * (number1 / number2); //生成0-99的随机数
        number3 = Math.round(randnum3);
        const string = number1.toString() + "÷" + number2.toString() + "-" + number3.toString() + "="; //题目字符串
        const answer = number1 / number2 - number3; //答案
        return { string,answer:answer.toString(),useranswer:""}
    },
}
// 高级
export const level3 = {
    level_1:function(){
        //两位数除以一位数
        var random = Math.round(Math.random() * 99);
        var factor = this.hasFactorBelow10(random);//factor为10random的10以下的因子
        while(random < 10 || factor == 0 ||factor ==2){
            random = Math.round(Math.random() * 99);
            factor = this.hasFactorBelow10(random);
        }
        var string = random.toString();
        string += " ÷ ";
        string += factor.toString();
        string += " =";
        var answer = Math.round(random/factor);
        return {string,answer:answer.toString(),useranswer:""}
    },
    
    level_2:function(){
        //三位数除以一位数
        var random = Math.round(Math.random() * 999);
        var factor = this.hasFactorBelow10(random);//factor为10random的10以下的因子
        while(random < 100 || factor == 0 ||factor ==2){
            random = Math.round(Math.random() * 999);
            factor = this.hasFactorBelow10(random);
        }
        var string = random.toString();
        string += " ÷ ";
        string += factor.toString();
        string += " =";
        var answer = Math.round(random/factor);
        return { string,answer:answer.toString(),useranswer:""}
        
    },
    level_3:function(){
        //个位数为0的四位数除以一位数
        //先生成3位数，然后乘以10
        var random = Math.round(Math.random() * 999);
        var factor = this.hasFactorBelow10(random);//factor为10random的10以下的因子
        while(random < 100 || factor == 0 ||factor ==2 ){
            random = Math.round(Math.random() * 999);
            factor = this.hasFactorBelow10(random);
        }
        random *= 10;
        var string = random.toString();
        string += " ÷ ";
        string += factor.toString();
        string += " =";
        var answer = Math.round(random/factor);
        return { string,answer:answer.toString(),useranswer:""}  
    },
    level_4:function(){
        //两位数乘以两位数
        var random1 = Math.round(Math.random() * 99);
        while(random1 < 10 ){
            random1 = Math.round(Math.random() * 99);
        }
        var random2 = Math.round(Math.random() * 99);
        while(random2 < 10 ){
            random2 = Math.round(Math.random() * 99);
        }
        var string = random1.toString();
        string += " × ";
        string += random2.toString();
        string += " =";
        var answer = Math.round(random1 * random2);
        return { string,answer:answer.toString(),useranswer:""}
        
    },
    level_5:function(){
        //三位数减法
        var random1 = Math.round(Math.random() * 999);
        while(random1 < 100 ){
            random1 = Math.round(Math.random() * 999);
        }
        var random2 = Math.round(Math.random() * 999);
        while(random2 < 100 ){
            random2 = Math.round(Math.random() * 99);
        }
        var temp;
        if(random2 > random1){
            temp = random2;
            random2 = random1;
            random1 = temp;
        }
        var string = random1.toString();
        string += " - ";
        string += random2.toString();
        string += " =";
        var answer = Math.round(random1 - random2);
        return { string,answer:answer.toString(),useranswer:""}

        
    },
    level_6:function(){
        //三位数加法
        var random1 = Math.round(Math.random() * 999);
        while(random1 < 100 ){
            random1 = Math.round(Math.random() * 999);
        }
        var random2 = Math.round(Math.random() * 999);
        while(random2 < 100 ){
            random2 = Math.round(Math.random() * 99);
        }
        var string = random1.toString();
        string += " + ";
        string += random2.toString();
        string += " =";
        var answer = Math.round(random1 + random2);
        return { string,answer:answer.toString(),useranswer:""}
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