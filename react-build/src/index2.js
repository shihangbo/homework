
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/29
 * @content 实现组件功能
 */

const React = {
	// creactElement方法返回的对象记录这个dom节点的所有信息，换言之，通过它就可以生成真正的dom，这个记录信息的对象就是虚拟dom
	createElement
}

function createElement(tag, attrs, ...children) {
	// console.log(tag)
	// console.log(attrs)
	// console.log(children)
	if(typeof tag === 'function') {
		return tag(attrs || {})
	}
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

function Welcome(props) {
	return <h1>hello, {props.name}</h1>
}
const element = <Welcome name='watson'/>

function App(props) {
	return (
		<div>
			<Welcome name={props.name + '111'}/>
			<Welcome name={props.name + '222'}/>
			<Welcome name={props.name + '333'}/>
		</div>
	)
}
const app = <App name='watson'/>

ReactDOM.render(
	app,
	document.getElementById('root')
)