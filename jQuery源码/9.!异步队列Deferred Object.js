/**
 * @author watson
 * @version V1.0
 * @since 2018/06/02
 * @content
 */

var content = '异步队列模块的引入，用于实现异步任务和毁掉函数的解耦，为ajax模块，队列模块，ready事件提供基础功能；'
              + '异步队列模块包含三个部分: jQuery.Callbacks(), jQuery.Deferred(), jQuery.when()'
              + 'jQuery.Callbacks(): 返回一个链式工具对象(回调函数列表)，用于管理一组回调函数。回调函数列表支持添加、移除、触发、锁定和禁用回调函数；'
              + ''
              + ''

var TITLE = '学习重点: 异步队列的用法，实现原理，源码，在jQuery中的应用'

var TITLE_1 = '异步队列的用法'
//没有实现异步队列之前的 jQuery.ajax()
$.ajax({
  url: 'ajax/test.html',
  success: function(){},
  error: function(){},
  complete: function(){},
})

//引入异步队列之后的 jQuery.ajax()
$.ajax({url: 'ajax/test.html'})
 .done(function(){})
 .done(function(){})
 .fail(function(){})
 .complete(function(){})

var TITLE_2 = '实现原理，源码'
var CONTENT_2_1 = '实现原理: 在回调函数列表内部，通过一个数组来保存回调函数，其他方法围绕这个数组进行操作和检测；'
var CONTENT_2_2 = ''



//js的连等关系，巧妙之处：变量object和flagsCache[flags]指向同一个空对象，后面改变object变量的属性，等同于改变flagsCache[flags]对象，注意这里的 object === flagsCache[flags] 返回 true
var object = flagsCache[flags] = {}
