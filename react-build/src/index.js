
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/24
 * @content 1 简单实现react的jsx和虚拟dom
 	 @content 2 实现组件功能
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

			if(key === 'className') key = 'class'

			if(typeof value === 'function') {
				dom[key.toLowerCase()] = value
			} else {
				dom.setAttribute(key, value)
			}

		})
	}

	vnode.children.forEach(child => render(child, dom))

	return container.appendChild(dom)

}

//组件化之路 函数组件Welcome
function Welcome(props) {
	return (<h1>hello, {props.name}</h1>)
}
//组件化之路 函数组件App
function App () {
	return (
		<div>
			<Welcome name='111' />
			<Welcome name='222' />
			<Welcome name='333' />
		</div>
	)
}
const element = <Welcome name='WATSON' />
const app = <App />


function onClick() {
	console.log('方法在哪里注册的？')
}

function tick() {
	const element = (
		<div>
			<h1 onClick={() => onClick()}>hello watson!</h1>
			<h2>it is {new Date().toLocaleTimeString()}</h2>
		</div>
	)

	ReactDOM.render(
		element,
		document.getElementById('root')
	)
}

setInterval(tick, 1000)

