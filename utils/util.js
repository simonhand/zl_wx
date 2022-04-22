const app = getApp()
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export const isNullObj = (obj) => {
  if (!obj) {
    return true;
  }
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

export const haveUserInfo = () => {
  if (!app.globalData.userInfo) {
    wx.navigateTo({
      url: '../login/login',
    })
    return false;
  }
  return true;
}

export function deepClone(obj) {
  function isObj(obj) {
    return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
  }
  if (!isObj(obj)) {
    throw new Error("非对象类型")
  }
  let newObj = Array.isArray(obj) ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObj(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj
}
export function throttle(fun, wait) {
  let lastime = 0
  return (...args) => {
    let now = +newDate()
    if (now - lastime > wait) {
      lastime = now
      fun.apply(this, args)
    }
  }
}

export function debounce(func, timeout) {
  let timer;
  return function () {
    if (timer) {
      // 如果在timeout秒调用 清空定时器
      clearTimeout(timer);
    }
    // 每次调用都指定timeout后再执行
    timer = setTimeout(() => {
      timer = null;
      func.apply(this, Array.from(arguments));
    }, timeout);
  };
}

export function zlEncodeList(list) {
  return JSON.stringify(list).replace(/\"/g,"+z&l+")
}

export const zlDecodeList = (list) => {
  return JSON.parse(list.replace(/\+z\&l\+/g,"\""));
}