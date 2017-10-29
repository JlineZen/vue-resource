### Emitter的实现

Emitter是一个pub/sub模式的实现。具有emit、on、once、off、applyEmit方法；在后续的vue组件中或一个vue实例中，我们可以看到在组件的通信中起到了至关重要的作用；

首先我们看vue初始化提交的一个emitter的粗略实现；

```javascript

  function Emitter (ctx) {
    this._ctx = ctx || this
  }

```

关于构造函数的一点思考：  
如果我们在Emitter的使用时，直接这样使用

  ```javasript
    var emitter = new Emitter()
  ```  
看上述使用，会出现什么问题呢？大家可以在console使用观看下，会发现emitter实例会有一个实例属性会无限的指向自己本身。那么作者为何会这样设计呢？具体又会怎样使用？看具体的实现可以查看source-code目录下的emitter。