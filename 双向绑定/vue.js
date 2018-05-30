
function Vue(options) {
  console.log(this)
  console.log(options)
  // this._init(options)
}

Vue.prototype._init = function(options) {
  console.log(this)
  this.$options = options
}

var vm = new Vue(1234)
vm._init()


//构造函数的this指向，原型中的this指向？