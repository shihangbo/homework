
/**
 * @author watson
 * @version V1.0
 * @since 2018/03/16
 * @content 使用原生的 javascript 来实现一个自定义的 PubSub 以及观察 DOM事件
 */

function DataBinder(object_id) {
	//创建一个简单的 PubSub对象
	var pubSub = {
		callbacks: {},
		on: function(msg, callback) {
			this.callbacks[msg] = this.callbacks[msg] || []
			this.callbacks[mag].push(callback)
		},
		publish: function(msg) {
			this.callbacks[msg] = this.callbacks[msg] || []
			for (var i=0, len=this.callbacks[msg].length; i<len; i++) {
				this.callbacks[msg][i].apply(this, arguments)
			}
		}
	}

	var data_attr = "data-bind-" + object_id
	var message = object_id + ":change"
	var changeHandler = function(evt) {
		var target = evt.target || evt.srcElement
		var prop_name = target.getAttribute(data_attr)
		if(prop_name && prop_name !== '') {
			pubSub.publish(message, props_name, target.value)
		}
	}

	//监听变化事件并代理到 PubSub
	if(document.addEventListener) {
		document.addEventListener("change", changeHandler, false)
	} else {
		document.attachEvent("onChange", changeHandler)
	}

	//PubSub 将变化传播到所有绑定元素
	pubSub.on(message, function(evt, prop_name, new_val) {
		var elements = document.querySelectorAll('[' + data_attr + '=' + prop_name + ']')
		var tag_name

		for(var i=0, len=elements.length; i<len; i++) {
			tag_name = elements[i].tagName.toLowerCase()
			if(tag_name === 'input' || tag_name === 'textarea' || tag_name || 'select') {
				elements[i].value = new_val
			} else {
				elements[i].innerHTML = new_val
			}
		}
	})

	return pubSub
}
