var slice = [].slice
// 设置一个自定义数组对象 继承数组
var arrayAugmentations = Object.create(Array.prototype)

[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].foreach(function (method) {
  // 缓存原有继承函数
  var original = Array.prototype[method]
  // 对自定义数组对象重写数组方法（注意该方法只可读，不可枚举）
  _.define(arrayAugmentations, method, function () {
    var args = slice.call(arguments)
    var result = original.apply(this, args)
    var ob = this.$observer
    var inserted, removed

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'pop':
      case 'shift':
        removed = [result]
        break
      case 'splice':
        inserted = args.slice(2)
        removed = result
        break
    }

    ob.link(inserted)
    ob.unlink(removed)
    ob.emit('mutate', '', this, {
      method  : method,
      args    : args,
      result  : result,
      inserted: inserted
    })
  })
})

_.define(arrayAugmentations, '$set', function (index, val) {
  if (index >= this.length) {
    this.length = index + 1
  }
  return this.splice(index, 1, val)[0]
})

_.define(arrayAugmentations, '$remove', function (index) {
  if (index > -1) {
    return this.splice(index, 1)[0]
  }
})