/**
 * @author watson
 * @version V1.0
 * @since 2018/06/03
 * @content
 */

var content = 'JavaScript为什么是弱类型语言，主要体现在哪里，弱类型转换的机制又是什么？'

var step_1 = '++[[]][+[]]+[+[]]===10？'
//引子

var step_2 = '随便写几个等式，演示js弱类型语言的神奇魔法'
//比较java对于类型的强制定义，演示jdk报错，解读报错信息，引出对于js隐式转换的原理，即隐式转换是如何进行的？
var n = '553'
// var n = '0xB'
// var n = '010'
console.log(typeof n); //输出 "string"
var n = +n;
console.log(typeof n); //输出 "number"


var step_3 = '4.2 一元运算符(+ -)'
ToNumber(GetValue(expre))

var step_4 = '4.3 加法运算符(+)'
var step_4_1 = '首先执行代码，调用 ToPrimitive 方法得到原始值'
var step_4_2 = '①如果原始值是两个数字，则直接相加得出结果'
var step_4_3 = '②如果两个原始值都是字符串，把第二个字符串连接到第一个上，也就是相当于调用 concat 方法'
var step_4_4 = '③如果只有一个原始值是字符串，调用 ToString 方法把另一个运算数转换成字符串，结果是两个字符串连接成的字符串'

var step_5 = '4.4 减法运算符(-)'
var step_5_1 = '①如果是两个数字，则直接相减得出结果'
var step_5_2 = '②如果有一个不是数字，会调用 ToNumber 方法按照规则转化成数字类型，然后进行相减'

var step_6 = '4.5 前自增运算符(++)'
var n = 10;
++n; // 11
//等价于
var n = 10;
n = n + 1; //11

var step_7 = '4.6 自动分号插入(;)'
//这部分暂时不讲

var step_7 = '4.7 对{}的解读，即浏览器对{}对解析，即js引擎是如何判断{}是代码块还是对象的？'
//js中，什么是代码块，什么是对象？
//这部分暂时不讲

var step_8 = '5 ECMAScript的规范定义的抽象操作'

GetValue(v)     //
Type(x)         //
ToNumber(x)     //
ToString(x)     //
SameValue(x, y) //比较非数字类型的x，y是否相同
ToPrimitive(x)  //转化为原始值

var step_9 = '5.2 GetValue(v)'

var step_10 = '5.3 SameValue(x, y)'

var step_11 = '5.4 ToPrimitive(v, PreferredType)'
var step_11_1 = 'JS引擎内部转换为原始值ToPrimitive(obj,preferredType)函数接受两个参数，第一个obj为被转换的对象，第二个preferredType为希望转换成的类型（默认为空，接受的值为Number或String）'
var step_11_2 = '在执行ToPrimitive(obj,preferredType)时如果第二个参数为空并且obj为Date的事例时，此时preferredType会被设置为String，其他情况下preferredType都会被设置为Number如果preferredType为Number'
var step_11_3 = 'ToPrimitive执行过程如下:'
//1. 如果obj为原始值，直接返回；
//2. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
//3. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
//4. 否则抛异常。

//如果preferredType为String，将上面的第2步和第3步调换，即：
//1. 如果obj为原始值，直接返回；
//2. 否则调用 obj.toString()，如果执行结果是原始值，返回之；
//3. 否则调用 obj.valueOf()，如果执行结果是原始值，返回之；
//4. 否则抛异常。

var step_11_4 = 'toString用来返回对象的字符串表示'
var step_11_5 = 'valueOf方法返回对象的原始值，可能是字符串、数值或bool值等'

//例子
var a={};
ToPrimitive(a)
//分析:a是对象类型但不是Date实例对象,所以preferredType默认是Number,先调用a.valueOf()不是原始值,继续来调
//用a.toString()得到string字符串,此时为原始值,返回之.所以最后ToPrimitive(a)得到就是"[object Object]".

var step_12 = '5.5 ToNumber(x)'
var step_13 = '5.6 ToString(x)'

var step_14 = '==运算符的规则'
//1. undefined == null，结果是true。且它俩与所有其他值比较的结果都是false。
//2. String == Boolean，需要两个操作数同时转为Number。
//3. String/Boolean == Number，需要String/Boolean转为Number。
//4. Object == Primitive，需要Object转为Primitive(具体通过valueOf和toString方法)。

var step_15 = '做题：++[[]][+[]]+[+[]]==10'
//根据运算符优先级拆分
var step_15_1 = (++[[]][+[]]) + ([+[]])
//计算 [+[]]，为什么ToNumber("")===0，哪里看出来的？
var step_15_2 = [+[]] = [0]
var step_15_3 = (++[[]][0]) + ([0])
//根据数组下标优先级高于医院运算符++
referce = [] + 1
//加法运算符 +
referce = ToNumber([]) + 1
referce = 0 + 1
referce = 1
//
var step_15_4 = 1 + ([0])
//加法运算符 +
var step_15_5 = 1 + '0'
var step_15_6 ='10'



