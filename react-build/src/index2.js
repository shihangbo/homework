
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/29
 * @content 实现组件功能
 */

import ReactDOM from './react-dom'
import React from './react'

// const React = {
// 	// creactElement方法返回的对象记录这个dom节点的所有信息，换言之，通过它就可以生成真正的dom，这个记录信息的对象就是虚拟dom
// 	createElement
// }

// function createElement(tag, attrs, ...children) {
// 	// console.log(tag)
// 	// console.log(attrs)
// 	// console.log(children)
// 	//定义函数组件
// 	// if(typeof tag === 'function') {
// 	// 	return tag(attrs || {})
// 	// }

	
// 	if(tag.prototype && tag.prototype.render) { //类组件返回
// 		return new tag(attrs)
// 	} else if(typeof tag === 'function') { //函数组件返回
// 		return tag(attrs || {})
// 	}
	
// 	return {
// 		tag, attrs, children
// 	}
// }

//函数组件
function Welcome(props) {
	return <h1>hello, {props.name}</h1>
}

function App(props) {
	return (
		<div>
			<Welcome name={props.name + '111'}/>
			<Welcome name={props.name + '222'}/>
			<Welcome name={props.name + '333'}/>
		</div>
	)
}


// class Welcome extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {}
// 	}
// 	render() {
// 		return <h1>hello, {this.props.name}</h1>
// 	}
// }
// class App extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {}
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<Welcome name="111"/>
// 			</div>
// 		)
// 	}
// }

class Counte extends React.Component {
	constructor(props) {
		super(props)
		this.state = {num: 0}
	}

	componentWillUpdate() {
		console.log('update')
	}
	componentWillMount() {
		console.log('mount')
	}
	onClick() {
		this.setState({num: this.state.num+1})
	}

	render() {
		return (
			<div onClick={() => this.onClick()}>
				<h1>number: {this.state.num}</h1>
				<button>add</button>
			</div>
		)
	}
}

ReactDOM.render(
	<Counte />,
	document.getElementById('root')
)
