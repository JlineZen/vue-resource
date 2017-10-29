/**
 * Emitter 构造函数Constructor
 * @param { object } ctx 需调用的执行上下文
 */

function Emitter (ctx) {
  // 为了observer对象而设置上下文context
  this._ctx = ctx || this
}

p = Emitter.prototype

/**
 * 监听事件
 */
p.on = function (event, fn) {
  // 回调队列
  this._cbs = this._cbs || {}
  // 初始化回调队列对象事件数组
  ;(this._cbs[event] = this._cbs[event] || []).push(fn)
  // 返回本身
  return this
}

/**
 * 只监听一次
 */
p.once = function (event, fn) {
  // 缓存本身
  var self = this
  this._cbs = this._cbs || {}
  // 临时函数
  function on () {
    self.off(event, on)
    fn.apply(this, arguments)
  }
  // 为了卸载监听函数off
  on.fn = fn
  this.on(event, on)
  return this
}

/**
 * 移除事件监听
 */
p.off = function (event, fn) {
  this._cbs = this._cbs || {}

  // 移除所有事件
  if (!arguments.length) {
    this._cbs = {}
    return this
  }

  var callbacks = this._cbs[event]
  if (!callbacks) return this

  // 移除对某一事件的监听
  if (arguments.length === 1) {
    delete this._cbs[event]
    return this
  }

  // 移除某一事件的特定监听回调
  var cb
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i]
    // 此处函数fn不为匿名函数，但是once监听时添加的零时on在此处为匿名函数所以使用了cb.fn
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1)
      break
    }
  }
  return this
}


/**
 * 触发监听函数， 参数为具体参数
 */
p.emit = function(event, a, b, c) {
  this._cbs = this._cbs || {}
  var callbacks = this._cbs[event]

  if (callbacks) {
    // 复制一份
    callbacks = callbacks.slice(0)
    for (var i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i].call(this._ctx, a, b, c)
    }
  }

  return this
}

/**
 * 触发监听函数队列 apply机制
 */
p.applyEmit = function (event) {
  this._cbs = this._cbs || {}
  var callbacks = this._cbs[event], args
  if (callbacks) {
    callbacks = callbacks.slice(0)
    args = callbacks.slice.call(arguments, 1)
    for (var i = 0, len = callbacks.length; i < len; i ++) {
      callbacks[i].apply(this._ctx, args)
    }
  }
  return this
}