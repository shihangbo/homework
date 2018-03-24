
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/24
 * @content 简单实现react的jsx和虚拟dom
 */

const React = {
	// creactElement方法返回的对象记录这个dom节点的所有信息，换言之，通过它就可以生成真正的dom，这个记录信息的对象就是虚拟dom
	createElement: function(tag, attrs, ...children) {
		return {
			tag,
			attrs,
			children
		}
	}
}

const ReactDOM = {
	//将虚拟dom渲染成真实dom
	vnodeToRealDom: function(vnode, container) {
		//当vnode为字符串时，渲染结果是一段文本
		if (typeof vnode === 'string') {
			const textNode = document.createTextNode(vnode)
			return container.appendChild(textNode)
		}

		//获取vnonde第一层元素标签
		const dom = document.createElement(vnode.tag)
		//给获取的元素添加属性
		if (vnode.attrs) {
			Object.keys(vnode.attrs).forEach(key => {
				if (key === 'className') key = 'class'
				dom.setAttribute(key, vnode.attrs[key])
			})
		}
		//遍历当前虚拟dom的子元素，递归生成各子元素
		vnode.children && vnode.children.forEach(child => ReactDOM.vnodeToRealDom(child, dom))

		//返回元素片段，即将渲染结果挂载到真正的dom上
		return container.appendChild(dom)
	},
	//实现vnodeToRealDom方法
	render: (vnode, container) => {
		//多次调用render函数，清楚原来内容
		container.innerHTML = ''
		return ReactDOM.vnodeToRealDom(vnode, container)
	}
}

ReactDOM.render(
	<h1>hello <span>watson!</span></h1>,
	document.getElementById('root')
)

function tick() {
	const element = (
		<div>
			<h1>hello watson!</h1>
			<h2>it is {new Date().toLocaleTimeString()}</h2>
		</div>
	)

	ReactDOM.render(
		element,
		document.getElementById('root')
	)
}

setInterval(tick, 1000)