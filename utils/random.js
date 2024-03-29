// 根据qty来决定return几位以内的随机数
export const randomNum = (qty) => {
    const baseNum = Math.random().toFixed(qty);
    console.log("baseNum", baseNum);
    console.log(baseNum * 10 ** qty)
    // 这里想向下取整避免0.1+0.3的情况，反正都是随机数不影响最终结果
    return Math.floor(baseNum * 10 ** qty);
}

// 这个是在 floor 与 ceil之间取随机数（包括floor和ceil）
export const randomNumBetween = (floor, ceil) => {
    const baseNum = Math.random();
    const section = (ceil - floor) * baseNum;
    return Math.round(section + floor);
}

// 随机几位数字符串
export const randomString = (qty) => {
    const res = [];
    for (let index = 0; index < qty; index++) {
        const baseNum = Math.random();
        const needNume = Math.round(baseNum * 36);
        res.push(needNume.toString(36));
    }
    return res.join('');
}