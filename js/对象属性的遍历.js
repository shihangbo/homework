/**
 * @author watson
 * @version V1.0
 * @since 2018/0327
 * @content  对象属性遍历的理解
 */


 【遍历对象属性的方法】
1.Object.getOwnPropertyNames(obj)
2.Object.keys(obj)
3.for(variable in object){...}

【区别】
1.Object.getOwnPropertyNames(obj): 遍历【对象本身】【可枚举】和【不可枚举】的属性，返回对象属性对应的字符串数组，可使用数组函数进行直接操作

2.Object.keys(obj) : 遍历【对象本身】的【可枚举】的属性，返回对象属性对应的字符串数组

3.for(variable in object){...} : 遍历对象【本身】以及【从原型链上继承】的【可枚举属性】，直接操作属性variabble


【拓展】
1.配合 hasOwnProperty() 实现过滤掉从原型链继承的属性的最佳实践
for(const key in data) {
	if({}.hasOwnProperty.call(data, key)) {
		...
		//处理对象data自身的可枚举的属性
	}else{
		...
		//处理对象data从原型链继承的可枚举属性
	}
}