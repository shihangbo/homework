
/**
 * @author watson
 * @version V1.0
 * @since 2018/05/20
 * @content
 */

var content = 'jquery对象是一个类数组对象，含有连续的整型数组、length属性和大量的jquery方法。jquery对象由构造函数 jQuery() 创建，$()则是 jQuery() 的缩写。'

var title = '构造函数 jQuery() 的七种用法'
//接受：一个字符串【css选择器】和可选的选择器上下文
//返回：一个包含了匹配的DOM元素的jquery对象，如果没有元素与之匹配，则创建一个空的jquery对象
$(selector, [context]).do()

//接受：一个字符串【一段html代码】
//返回：jquery用这段html创建新的dom元素，并返回包含了这个dom元素的jquery对象
$(html, [ownerDocuments]).appenedTo('body')

//接受：DOM元素或DOM元素数组
//处理：把DOM元素封装到jquery对象中并返回
$(elements).do()

//接受：一个普通的js对象
//处理：把对象封装到jquery对象中并返回 -- 使用场景：在普通js对象上实现自定义事件的绑定和触发
$(object).do()

//接受：函数
//返回：绑定 ready 事件监听函数，当DOM结构家在完成是执行
$(callback).do()

//接受：jquery对象
//返回：该jquery对象的拷贝副本
$(jQueryObject).do()

//接受：
//返回：一个空的jquery对象
$().do()