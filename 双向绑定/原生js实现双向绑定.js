
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/16
 * @content 使用原生的 javascript 来实现一个自定义的 PubSub 以及观察 DOM事件
 */

function DataBinderHtml(object_id) {

	//创建pubsub对象
	var pubSub = {
		callbacks: {},
		//将变化代理到pubsub发布者
		on: function(msg, callback) {
			this.callbacks[msg] = this.callbacks[msg] || []
			this.callbacks[msg].push(callback)
		},
		//将变化传播到ui页面制定绑定到元素上
		publish: function(msg) {
			this.callbacks[msg] = this.callbacks[msg] || []
			for(var i=0, len=this.callbacks[msg].length; i<len; i++) {
				this.callbacks[msg][i].apply(this, arguments)
			}
		}
	}
	//ui页面元素自定义data属性
	var data_attr = "data-bind-" + object_id
	//事件标志符
	var message = object_id + ":change"

	//变化代理事件函数
	var changeHandler = function(event) {
		var target = event.target || event.srcElement
		var prop_name = target.getAttribute(data_attr)
		if(prop_name && prop_name !== "") {
			pubSub.publish(message, prop_name, target.value)
		}
	}

	//监听html变化，将变化代理到pubSub
	if(document.addEventListener) {
		document.addEventListener('change', changeHandler)
	} else {
		document.attachEvent('onChange', changeHandler)
	}

	//pubSub对象将变化传播到所有绑定元素
	pubSub.on(message, function(event, prop_name, new_val) {
		var elements = document.querySelectorAll('[' + data_attr + '=' + prop_name + ']')
		var tag_name
		for(var i=0, len=elements.length; i<len; i++) {
			tag_name = elements[i].tagName.toLowerCase()
			if(tag_name === 'input' || tag_name === 'textarea' || tag_name === 'select') {
				elements[i].value = new_val
			} else {
				elements[i].innerHTML = new_val
			}
		}
	})
	
	return pubSub
}

//User模型
function Model(uid) {

	//创建一个pubSub实例，用于监听html变化，将变化代理到pubSub实例，实例对象将变化传播到所有绑定元素
	var binder = new DataBinderHtml(uid)

	//创建user模型
	user = {
		//对象属性集合
		attributes: {},

		//属性设置使用数据绑定器将变化代理到PubSub对象进行发布
		//代理到pubSub对象时，传递的参数有 this ，用于区分变化来自“属性设置”（即调用user.set()），还是来自“元素的change事件”
		set: function(attr_name, val) {
			this.attributes[attr_name] = val;
			binder.publish(uid + ':change', attr_name, val, this)
		},

		get: function(attr_name) {
			return this.attributes[attr_name]
		},

		_binder: binder
	}

	//向发布者pubSub对象，注册设置属性事件，以便发布者进行统一发布
	binder.on(uid + ':change', function(event, attr_name, new_val, initiator) {
		if(initiator !== user) {
			user.set(attr_name, new_val)
		}
	})

	return user
}

//现在，无论我们什么时候想把模型的属性绑定到UI的一部分上，我们只需要在相应的HTML元素上设置一个合适的data属性即可。
var model = new Model('name')
model.set('name', 888)
