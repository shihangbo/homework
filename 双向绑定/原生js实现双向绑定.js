
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/16
 * @content 使用原生的 javascript 来实现一个自定义的 PubSub 以及观察 DOM事件
 */

function DataBinderHtml(object_id) {
	console.log(1)
	//创建意见简单的pubsub对象
	var pubSub = {
		callbacks: {},
		on: function(msg, callback) {
			console.log(2)
			this.callbacks[msg] = this.callbacks[msg] || []
			this.callbacks[msg].push(callback)
		},
		publish: function(msg) {
			console.log(3)
			this.callbacks[msg] = this.callbacks[msg] || []
			for(var i=0, len=this.callbacks[msg].length; i<len; i++) {
				this.callbacks[msg][i].apply(this, arguments)
			}
		}
	}
	var data_attr = "data-bind-" + object_id
	var message = object_id + ":change"

	console.log(4)
	var changeHandler = function(event) {
		console.log(5)
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
	console.log(6)
	pubSub.on(message, function(event, prop_name, new_val) {
		console.log(7)
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

	console.log(8)
	return pubSub

}

//User模型
function User(uid) {
	console.log(10)
	var binder = new DataBinderHtml(uid)

	console.log(11)
	user = {
		attributes: {},

		//属性设置使用数据绑定器PubSub来发布变化
		set: function(attr_name, val) {
			console.log(12)
			this.attributes[attr_name] = val;
			console.log('a')
			binder.publish(uid + ':change', attr_name, val, this)
			console.log(user.attributes)
		},

		get: function(attr_name) {
			console.log(13)
			return this.attributes[attr_name]
		},

		_binder: binder
	}

	console.log(14)
	binder.on(uid + ':change', function(event, attr_name, new_val, initiator) {
		console.log(15)
		console.log(initiator !== user)
		if(initiator !== user) {
			user.set(attr_name, new_val)
		}
	})

	return user
}

//现在，无论我们什么时候想把模型的属性绑定到UI的一部分上，我们只需要在相应的HTML元素上设置一个合适的data属性即可。
console.log(17)
var user = new User('name')
console.log(16)
user.set('name', 888)
