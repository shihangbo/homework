
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/24
 * @content setAttribute函数改版
 */

const React = {
	// creactElement方法返回的对象记录这个dom节点的所有信息，换言之，通过它就可以生成真正的dom，这个记录信息的对象就是虚拟dom
	createElement
}

function createElement(tag, attrs, ...children) {
	return {
		tag, attrs, children
	}
}

const ReactDOM = {
	render: (vnode, container) => {
		container.innerHTML = ''
		return render(vnode, container)
	}
}

function render(vnode, container) {
	if(typeof vnode === 'string' || typeof vnode === 'number') {
		const textNode = document.createTextNode(vnode)
		return container.appendChild(textNode)
	}

	const dom = document.createElement(vnode.tag)

	if(vnode.attrs) {
		Object.keys(vnode.attrs).forEach(key => {
			const value = vnode.attrs[key]
			setAttribute(dom, key, value)
		})
	}

	vnode.children.forEach(child => render(child, dom))

	return container.appendChild(dom)

}

function setAttribute(dom, name, value) {
	// 如果属性名是className，则改回class
	if (name === 'className') name = 'class'
	// 如果属性名是事件，则进行事件绑定
	if (/on\w+/.test(name)) {
		name = name.toLowerCase()
		dom[name] = value || ''
	// 如果属性名是style，则更新style对象
	} else if (name === 'style') {
		// 以 style="width: 20px;height: 20px" 的形式设置
		if (!value || typeof value === 'string') {
			dom.style.cssText = value || ''
		// 以 style={{width: 20, color: red}} 的形式设置，可以省略单位px
		} else if (value || typeof value === 'object') {
			for (let key in value) {
				dom.style[key] = typeof value[key] === 'number' ? value[key] + 'px' : value[key]
			}
		}
	// 如果是普通属性，则直接更新属性
	} else {
		// 元素属性检测
		if (name in dom) {
			dom[name] = value || ''
		}
		if (value) {
			dom.setAttribute(name, value)
		} else {
			dom.removeAttribute(name)
		}
	}
}

const element = (
	<div>
		<h1 id="aa" style="color: red; width: 20px;" onClick={onClick} name='' data-url='url'>watson</h1>
	</div>
)
// 方法绑定的两种方式
// 1. onClick={onClick} runtime:函数onClick执行时this对象绑定到当前元素，推荐！
// 2. onClick={() => onClick()} runtime:函数onClick执行时this对象指向window，不推荐！

ReactDOM.render(
	element,
	document.getElementById('root')
)

function onClick() {
	console.log('方法在哪里注册的？')
	console.log(this)
}

// function tick() {
// 	const element = (
// 		<div>
// 			<h1 onClick={() => onClick()} style="color: red;">hello watson!</h1>
// 			<h2>it is {new Date().toLocaleTimeString()}</h2>
// 		</div>
// 	)

// 	ReactDOM.render(
// 		element,
// 		document.getElementById('root')
// 	)
// }

// setInterval(tick, 1000)

