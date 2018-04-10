
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/24
 * @content 1 简单实现react的jsx和虚拟dom
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
	render: render,
	renderComponent: renderComponent
}

function render(vnode, container) {
	return container.appendChild(_render(vnode))
}

function _render(vnode, container) {

	if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = ''

	if (typeof vnode === 'number') vnode = String(vnode)

	if (typeof vnode === 'string') {
		let textNode = document.createTextNode(vnode)
		return textNode
	}

	if (typeof vnode.tag === 'function') {
		// createComponent方法用来创建组件实例，并且将函数定义组件拓展为类定义组件进行处理，以免其他地方需要区分不同定义方式
		const component = createComponent(vnode.tag, vnode.attrs)
		// setComponentProps方法用来更新props，在其中可以实现componentWillMount，componentWillReceiveProps两个生命周期方法
		setComponentProps(component, vnode.attrs)

		return component.base
	}

	const dom = document.createElement(vnode.tag)

	if(vnode.attrs) {
		Object.keys(vnode.attrs).forEach(key => {
			const value = vnode.attrs[key]
			setAttribute(dom, key, value)

		})
	}

	vnode.children.forEach(child => render(child, dom))

	return dom

}

function createComponent(component, props) {
	let inst

	if (component.prototype && component.prototype.render) {
		inst = new component(props)
	} else {
		inst = new Component(props)
		inst.constructor = component
		inst.render = function() {
			return this.constructor(props)
		}
	}

	return inst
}

function setComponentProps(component, props) {
	if (!component.base) {
		if (component.componentWillMount) component.componentWillMount()
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps()
	}
	component.props = props
	renderComponent(component)
}

function renderComponent(component) {
	let base

	const renderer = component.render()

	if (component.base && component.componentWillUpdate) {
		component.componentWillUpdate()
	}

	base = _render(renderer)

	if (component.base) {
		if ( component.componentDidUpdate ) component.componentDidUpdate()		
	} else if (component.componentDidMount) {
		component.componentDidMount()
	}

	if ( component.base && component.base.parentNode ) {
		component.base.parentNode.replaceChild( base, component.base )
	}

	component.base = base
	base._component = component
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

// 组件部分
class Component {
	constructor(props = {}) {
		this.state = {}
		this.props = props
	}

	setState(stateChange) {
		Object.assign(this.state, stateChange)
		renderComponent(this)
	}
}


class Counter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			num: 1
		}
	}
	onclick() {
		console.log(this)
		this.setState({num: this.state.num + 1})
	}
	render() {
		return (
			<div>
				<h1 id="aa" style="color: red; width: 20px;" onClick={onClick} name='' data-url='url'>watson</h1>
				<input type="text" id="inpt" class="" placeholder="我是placeholder"/>
				<h1>count: {this.state.num}</h1>
				<button onClick={() => this.onclick()}>add</button>
			</div>
		)
	}
	
}

// 方法绑定的两种方式
// 1. onClick={onClick} runtime:函数onClick执行时this对象绑定到当前元素，推荐！
// 2. onClick={() => onClick()} runtime:函数onClick执行时this对象指向window，不推荐！

ReactDOM.render(
	<Counter />,
	document.getElementById('root')
)

function onClick() {
	console.log('方法在哪里注册的？')
	console.log(this)
}

document.getElementById('inpt').addEventListener('focus', function() {
	this.className = ''
}, false)

document.getElementById('inpt').addEventListener('blur', function() {
	this.className = 'placeholder'
}, false)