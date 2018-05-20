/**
 * @author watson
 * @version V1.0
 * @since 2018/05/20
 * @content
 */

var content = '构造jquery对象模块的总体源码结构'

(function(window, undefined) {                                  //16
  var jQuery = (function() {                                    //22
    var jQuery = function(selector, contenxt) {                 //25
      return new jQuery.fn.init(selector, context, rootjQuery)  //27
    }                                                           //28
    jQuery.fn = jQuery.prototype = {                            //97
      constructor: jQuery,                                      //98
      init: function(selector, context, rootjQuery) {           //99
        //do something
      },
      //原型属性和方法
    }                                                           //319
    jQuery.fn.init.prototype = jQuery.fn                        //322

    jQuery.extend = jQuery.fn.extend = function() {             //324
      //do something
    }
    jQuery.extend({                                             //388
      //静态属性和方法
    })                                                          //892

    return jQuery                                               //955
  })();                                                         //957

  window.jQuery = window.$ = jQuery                             //9246
})(window);                                                     //9266

var title = '构造jqury对象的总体源码结构解读'
var P1 = '25定义一个变量jQuery，它的值是jQuery构造函数，在955返回并赋值给22变量jQuery，so这两个jQuery变量是等价的，都指向jQuery构造函数'
var P2 = '97-319重写jQuery构造函数的原型对象，98让原型属性指向jQuery构造函数，99定义原型的一个方法，该方法相对特殊，一方面27看到调用jQuery构造函数时，实际返回的是该方法的实例；另一方面该方法负责解析参数selector和context的类型并执行相应的查找，此外还定义了一些其他原型属性和方法'
var p3 = 'jQuery构造函数的原型对象覆盖jQuery.fn.init的原型对象，作用使在jQuery构造函数【原型】上定义的【init方法的原型函数】指向【jQuery构造函数的原型】，即在init构造函数定义的属性和方法，都可以被实例所继承'
var p4 = 'jQuery.extend = jQuery.fn.extend的作用后面详细说明，传送门'

var preQ = '关于自调用匿名函数，自调用匿名函数的参数设置(window, undefined)，自调用匿名函数的调用形式(怎么调用，末尾加分号等)'
var preA = '第一篇文章已经有详细的阐述，传送门'
var Q1 = '为什么在jQuery构造函数内部使用new 返回另一个构造函数的实例？'
var A1 = '一省：通过在jQuery构造函数内部运用new创建另一个构造函数的实例，省去了jQuery构造函数前面的new的使用'
var Q2 = '97为什么执行 jQuery.fn = jQuery.prototype？'
var A2 = '二省：jQuery.fn 是 jQuery.prototype 的缩写，方便拼写'
var Q3 = '既然调用jQuery构造函数返回的是jQuery.fn.init()构造函数的实例，为什么能在该实例上调用jQuery构造函数原型的方法和属性？'
var A3 = '执行322之后，jQuery.fn.init()构造函数的原型被指向jQuery构造函数的原型'
var Q4 = '22-957为什么要用一个自调用匿名函数？'
var A4 = 'jQuery为了实现高内聚低耦合的设计思想，一定程度的避免jQuery构造函数模块与其他模块的耦合度，即jQuery构造函数内部定义的变量只在jQuery构造函数内部使用'
var Q5 = '为什么要重写jQuery构造函数的原型对象？'
var A5 = '优化jQuery构造函数的原型对象属性，jQuery对象只包含5种非继承属性(context, length, selector)，其余都继承自原型对象jQuery.prototype'