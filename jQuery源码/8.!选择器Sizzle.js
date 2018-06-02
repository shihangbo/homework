/**
 * @author watson
 * @version V1.0
 * @since 2018/06/02
 * @content
 */

var content = 'Sizzle 是一款纯js实现的css选择器引擎。在Sizzle内部，通过调用 querySelectorAll() 方法查找元素，返回结果。'

var TITLE = '学习重点: 分析Sizzle的设计思路，工作原理，源码实现(特别是浏览器不支持方法querySelectorAll的情况)，jQuery对Sizzle的整合和拓展'

var TITLE_1 = '分析Sizzle的设计思路'
var CONTENT_1 = 'Sizzle 是一款从有想做查找的选择器引擎(如 div.red>p 为什么要从右向左查找？)，提供的三个步骤的核心接口：'
                + '正则 chunker 负责从选择器表达式中提取快表达式和块关系符；'
                + '方法 Sizzle.find() 负责查找快表达式匹配的元素集合，方法 Sizzle.filter() 负责用块关系符过滤元素集合；'
                + '对象 Sizzle.selector.relative 中的块关系过滤函数根据块间关系符过滤元素集合；'


var TITLE_3 = 'jQuery对Sizzle的整合和拓展'
var CONTENT_3 = ''