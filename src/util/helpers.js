import ImageViwer from 'viewerjs';
export function formatValue(val) {
  return val || '--';
}
export function formatTimeVal(time, fromat = 'YYYY-MM-DD') {
  return time !== undefined && window.moment(time).isValid() ? window.moment(time).format(fromat) : '--';
}
/**
 * 图片预览
 * @param box
 * @param option
 * @constructor
 */
export function InitImageViwer(box = 'common-img-list', option = {}) {
  setTimeout(() => {
    const el = document.getElementById(box) || document.querySelectorAll(`.${box}`);
    if (el.length) {
      el.forEach(z => {
        new ImageViwer(z, option);
      })
    }
  }, 1000);
}
/**
 * 检查数组
 * @param data
 * @returns {boolean}
 */
export function isArray(data) {
  return Object.prototype.toString.call(data) === "[object Array]";
}

/**
 * 判读数字
 * @param data
 * @returns {boolean}
 */
export function isNumber(data) {
  return Object.prototype.toString.call(data) === "[object Number]";
}
/**
 * 检查对象
 * @param data
 * @returns {boolean}
 */
export function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
}
/**
 * 检查字符串
 * @param data
 * @returns {boolean}
 */
export function isString(data) {
  return Object.prototype.toString.call(data) === "[object String]";
}
/**
 * 检查函数
 * @param data
 * @returns {boolean}
 */
export function isFunction(data) {
  return Object.prototype.toString.call(data) === "[object Function]";
}
/**
 * 是否是class组件
 * @param data
 * @returns {boolean}
 */
export function isReactComponent(data) {
  try {
    return !!data.prototype.isReactComponent;
  } catch (e) {
    return false;
  }
}
