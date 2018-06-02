
/**
 * @author watson
 * @version V1.0
 * @since 2018/06/02
 * @content
 */

var content = 'jQuery.extend() / jQuery.fn.extend() 用于合并两个或多个对象的属性到第一个对象'

jQuery.extend([deep], target, object1, '...')
jQuery.fn.extend([deep], target, object1, '...')
//参数说明
//1. deep 是可选的布尔值，表示是否进行深度合并（递归合并），默认是不递归的，如果第一个参数的属性本身是一个对象或数组，他会被第二个或后面的其他参数的同名属性完全覆盖；
//2. target 目标对象；
//3. object1 以及后面的 '...' 是源对象，包含了待合并的属性；
//4. 注意：如果仅提供一个对象，意味着target被忽略，jQuery或jQuery.fn被当作目标对象，通过这种方式在jQuery或jQuery.fn上添加新的属性和方法；

var Q1 = 'jQuery.extend() 与 jQuery.fn.extend() 的区别?'
    A['1.1'] = 'jQuery.extend(fn) 方法是给 jQuery构造函数添加静态方法，调用方式 $.fn()'
    A['1.2'] = 'jQuery.fn.extend(fn) 方式是给 jQuery原型添加静态方法，调用方式 $(selector).fn()'


//知识点巩固
//1.遍历对象属性
if (optinon != null) {
  for (key in option) {
    //do something
  }
}

//2.堆栈溢出异常 - Uncaught RangeError: Maximum call stack size exceeded
var o = {}
o.n1 = o
$.extend(true, o, {n2: o})

//3.自动类型转换
