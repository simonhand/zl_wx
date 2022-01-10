
// 根据qty来决定return几位以内的随机数

export const randomNum = (qty) => {
    const baseNum = Math.random().toFixed(qty);
    console.log("baseNum",baseNum);
    console.log( baseNum * 10 ** qty)
    // 这里想向下取整避免0.1+0.3的情况，反正都是随机数不影响最终结果
    return Math.floor(baseNum * 10 ** qty) ;
}

