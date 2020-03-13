/**
 * 安卓机型判断
 */
const isAndroid = function () {
  var ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('android') > -1
}
// 微信移动端判断
var checkWx = function () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true
  }
  return false
}

// 微信移动端判断
var checkQq = function () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/QQ/i) === 'qq') {
    return true
  }
  return false
}
var formateZero = function (time) {
  if (time >= 10) {
    return time
  } else {
    return `0${time}`
  }
}
export default {
  isAndroid,
  checkWx,
  checkQq,
  formateZero
}
