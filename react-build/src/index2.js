
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
	//定义函数组件
	// if(typeof tag === 'function') {
	// 	return tag(attrs || {})
	// }

	if(tag.prototype && tag.prototype.render) { //类组件返回
		return new tag(attrs)
	} else if(typeof tag === 'function') { //函数组件返回
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
	console.log('-----------')
	console.log(vnode)
	console.log('-----------')

	if(vnode === undefined) return

	if ( vnode.isReactComponent ) {
		const component = vnode;

		if ( component._container ) {
				if ( component.componentDidUpdate ) {
						component.componentDidUpdate()
				}
		} else if ( component.componentDidMount ) {
				component.componentDidMount()
		}

		component._container = container   // 保存父容器信息，用于更新

		vnode = component.render()
	}

	console.log('-----------')
	console.log(vnode)
	console.log('-----------')

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

//函数组件
// function Welcome(props) {
// 	return <h1>hello, {props.name}</h1>
// }
// const element = <Welcome name='watson'/>

// function App(props) {
// 	return (
// 		<div>
// 			<Welcome name={props.name + '111'}/>
// 			<Welcome name={props.name + '222'}/>
// 			<Welcome name={props.name + '333'}/>
// 		</div>
// 	)
// }
// const app = <App name='watson'/>

//定义 Component类组件
class Component {
	constructor(props = {}) {
		this.isReactComponent = true
		this.state = {}
		this.props = props
	}

	setState(stateChange) {
		Object.assign(this.state, stateChange)
		console.log('-----------')
		console.log(this)
		console.log(this._container)
		console.log('-----------')
		if(this._container) {
			ReactDOM.render(this, this._container)
		}
	}
}

class Welcome extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return <h1>hello, {this.props.name}</h1>
	}
}
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<div>
				<Welcome name="111"/>
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)


/**
 * 拓展1
 * class
 * 
 */

/**
 * 拓展2
 * extends
 * 
 * 
 */