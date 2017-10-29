/**
 * Observer Constructor
 */

 // Observer构造函数
 function Observer () {
   // Emitter构造函数应用
   Emitter.call(this)
   this.connections = Object.create(null)
 }

 var p = Observer.prototype = Object.create(Emitter.prototype)

 p.observe = function (obj) {
   if (obj && obj.$observer) {
     return
   }

   if (_.isArray(obj)) {
    this.observeArray(obj)
    return true
   }

   if (_.isObject(obj)) {
     this.observeObject(obj)
     return true
   }
 }