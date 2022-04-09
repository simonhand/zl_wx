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