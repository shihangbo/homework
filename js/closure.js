/**
 * @author watson
 * @version V1.0
 * @since 2018/03/20
 * @content closure -- javascript中功能最强大的抽象概念之一
 * @概念：有权访问另一个函数作用域中的变量的函数，他可以保护一个【可反复使用的局部变量】
 * @备注：外层函数调用几次，就创建几个闭包，同时存在几个受保护的变量的副本
 * @应用场景
 * 		1. 模块
 * 		2. 延时器（setTimeout）、定时器（setInterval）
 * 		3. 监听器
 */


// 举个例子一
function Product() {
	var name
	this.setName = function(new_val) {
		name = new_val
	}
	this.getName = function() {
		return name
	}
}

var p1 = new Product()
p1.setName('watson')
console.log(p.name)
console.log(p.getName)

//模块
//一个模块应该具有私有属性、私有方法、共有属性、共有方法，闭包能很好的将模块的共有属性、共有方法暴露出来
var myModule = (function(window, undefined) {
	let name = 'watson'
	function getName() {
		return name
	}

	return {
		getName
	}
})(window)

console.log(myModule.getName()) //watson

//延时器（setTimeout）、定时器（setInterval）
//闭包可以模拟块级作用域
for (var i = 0; i<5; i++) {
	((j) => {
		setTimeout(() => {
			console.log(j)
		}, 1000*j)
	})(i)
}

//监听器
// 举个例子一：获取一个元素，点击它的时候变红
// 不好的代码方式：内存泄漏，变量el无法被回收
// 原因：对el的引用被放在一个匿名内部函数中，即在javascript对象（这个内部函数）和本地对象之间（el）创建了一个循环引用
function addHandler() {
	var el = document.getElementById('el')
	el.onclick = function() {
		el.style.backgroundColor = 'red'
	}
}

// 推荐的代码方式
function addHandler() {
	document.getElementById('el').onclick = function() {
		this.style.backgroundColor = 'red'
	}
}




/**
 * @content 内存泄漏 -- closure的一个坏处
 * @概念：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放内存；
 
		-javascript引擎垃圾回收方案: 标记清除，即
    	A.从根对象开始遍历所有可访问的对象；
    	B.回收已不可访问的对象；

		-js对于垃圾回收的应用
			A.数组-清零操作
        	arr = [];       // 不推荐，arr数组被清空，同时新建了一个空数组对象；
        	arr.length = 0; // 推荐，arr数组被清空，还不额外开辟新内存；
	    B.对象操作
	        尽量复用；
	        obj = null;     // 及时清除无用对象;
	    C.循环操作
	        避免在循环里面创建对象；
	        避免在循环里面创建函数；

	   -常见的内存泄漏
	   	在IE中，每当在一个 JavaScript 对象和一个本地对象之间形成循环引用时，就会发生内存泄露。

  */
