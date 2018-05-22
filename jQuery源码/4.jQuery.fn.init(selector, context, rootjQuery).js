
/**
 * @author watson
 * @version V1.0
 * @since 2018/05/20
 * @content
 */

var content = '构造函数 jQuery.fn.init() 的解析，他的作用：负责解析参数 selector 和 contenxt 的类型，并执行相应的逻辑，返回实例对象'

var title = '参数 selector 和 contenxt 共有12个有效分支，具体如图：'
var img = '001'

//接受：selector可以转换为false
//返回：this，空jQuery对象
$(selector)

//接受：DOM元素，判断依据是参数selector有属性nodeType
//返回：包含该DOM元素的jQuery对象
$(selector)

//【字符串的情况的处理逻辑】start ------------------------------
//-1接受：'body'
//-1返回：包含body元素的jQuery对象
$(selector)

//-2接受：单独标签
//-2处理：调用 document.createElement() 创建标签对应的 DOM元素，并添加对应属性和属性值，合并到当前jQuery对象中返回
//-3返回：return jQuery.merge(this, selector)
$(selector)

//-3接受：复杂HTML代码
//-3处理：利用浏览器的 innerHTML 机制创建 DOM元素，合并到当前jQuery对象中返回 (jQuery函数：jQuery.buildFragment(), jQuery.clean())
//-3返回：return jQuery.merge(this, selector)
$(selector)

//-4接受：'#id'，且未指定参数 context
//-4返回：调用 document.getElementById() 查找制定id属性的DOM元素，合并到当前jQuery对象中返回
$(selector)

//-5接受：'div.color', 且没有指定上下文
//-5返回：return rootjQuery.find('div.color')
$(selector)

//-6接受：'div.color', 指定上下文，且上下文是 jQuery对象
//-6返回：return context.find('div.color')
$(selector)

//-7接受：'div.color', 指定上下文，且上下文是 DOM元素
//-7返回：return this.constructor(context).find('div.color')
$(selector)
//【字符串的情况的处理逻辑】end --------------------------------

//接受：函数
//处理：jQuery.isFunction(selector) 进行判断，绑定 ready 事件
//返回：return rootjQuery.ready(selector)
$(selector)

//接受：jQuery对象
//处理：如果 selector 存在 selector属性，则认为它是 jQuery对象，则复制参数的 jQuery对象属性到当前 jQuery对象并返回
$(selector)

//接受：任意其他值，数组或类数组
//处理：添加到当前 jQuery对象中并返回
//返回：return jQuery.makeArray(selector, this)
$(selector)


