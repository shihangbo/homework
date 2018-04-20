
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
		// createComponent方法用来创建组件实例，将函数定义组件拓展为类定义组件进行处理，以免其他地方需要区分不同定义方式
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
	console.log(inst)
	return inst
}

/**
 * 类组件：inst数据结构
 * Counter {
 * 		base: { div },     // base对象是当前node节点信息，包含属性，子节点，事件等
 * 		props: null,       // 从父节点传递的参数
 * 		state: { num: 1 }  // 组件私有属性
 * }
 * 
 * 函数组件：inst数据结构
 * Watson {
 * 		base: { div },     // base对象是当前node节点信息，包含属性，子节点，事件等
 * 		props: null,       // 从父节点传递的参数
 * 		state: {}          // 组件私有属性
 * 		constructor: function Watson(){}
 * 		render: function (){}  // 我猜是 React.cteateElememt()函数
 * }
**/

/**
 * setComponentProps函数解读

	if (如果component实例没有base属性) {
		执行component实例定义的 componentWillMount() 函数
	} else if (如果component实例存在 componentWillReceiveProps函数) {
		执行component实例定义的 componentWillReceiveProps() 函数
	}

	给实例对象添加 props 属性

	调用renderComponent(实例对象) 方法
 */


function setComponentProps(component, props) {
	console.log(component.componentWillReceiveProps)
	if (!component.base) {
		if (component.componentWillMount) component.componentWillMount()
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps()
	}
	component.props = props
	renderComponent(component)
}

/**
 * renderComponent函数解读

	调用实例的render函数，得到实例的虚拟dom对象

	if(实例是否存在base对象 && 实例是否存在componentWillUpdate函数) {
		执行 componentWillUpdate() 函数
	}

	【重点】: base对象 记录dom元素信息
	base = 执行 _render(renderer)




 */

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
			num: props.num
		}
	}
	onclick() {
		this.setState({num: watson += 1})
	}
	componentWillMount() {
		console.log('componentWillMount')
	}
	componentDidMount() {
		console.log('componentDidMount')
	}

	componentWillReceiveProps() {
		console.log('componentWillReceiveProps')
	}
	componentWillUpdate() {
		console.log('componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('componentDidUpdate')
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

// 方法绑定的三种方式
// 1. onClick={onClick} runtime:函数onClick执行时this对象绑定到当前元素，推荐！
// 2. onClick={() => onClick()} runtime:函数onClick执行时this对象指向window，不推荐！
// 3. onClick={() => this.onClick()} runtime: ?

function Watson(props) {
	return (
		<h1 data-url="nnnnnn"><span className="aaa">Hi, </span>{this.props.name}</h1>
	)
}

var watson = 1
ReactDOM.render(
	<Counter num={watson} />,
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


/**
 * diff实现原则
 * 1.对比当前真实dom和虚拟dom，在对比过程中直接更新真实dom
 * 2.只对比同一层级的变化
 */
/**
 * 对于第一点的实现
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM（三种：文本节点，原生dom节点，组件）
 * @returns {HTMLElement} 更新后的DOM
 */
function diff( dom, vnode ) {
	//对比文本节点
	let out = ''
	if (typeof vnode === 'string') {
		if (dom && dom.nodeType === 3) {
			if (dom.textContent !== vnode) {
				dom.textContent = vnode
			}
		} else {
			out = document.createTextNode(vnode)
			if (dom && dom.parentNode) {
				dom.parentNode.replaceChild(out, dom)
			}
		}

		return out
	}
	//对比非文本节点
	
}