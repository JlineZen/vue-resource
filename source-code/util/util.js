var toString = Object.prototype.toString


/**
 * mix properties to target object
 * 杂糅
 */

exports.mixin = function (target, mixin) {
  for (let key in target) {
    if (target[key] !== minxi[key]) {
      target[key] = mixin[key]
    }
  }
  return target
}

/**
 * validate if it's Object type
 */

exports.isObject = function (obj) {
  return toString.call(obj) === '[object object]'
}

/**
 * 验证是否为Array
 */

exports.isArray = function (obj) {
  return Array.isArray(obj)
}

/**
 * 定义一个只可读、不可枚举的对象的key及val
 */

exports.define = function (obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    configurable: true,
    writable: false,
    enumerable: false
  })
}