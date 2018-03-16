/**
 * @author watson
 * @version V1.0
 * @since 2018/03/16
 * @content 最简单也是最有效的途径是使用发布者-订阅者模式。
 						思想很简单：我们可以使用自定义的data属性在HTML代码中指明绑定。
 						所有绑定起来的JavaScript对象以及DOM元素都将“订阅”一个发布者对象。
 						任何时候如果JavaScript对象或者一个HTML输入字段被侦测到发生了变化，
 						我们将代理事件到发布者-订阅者模式，这会反过来将变化广播并传播到所有绑定的对象和元素。
 */

function DataBinderHtml(object_id) {
	//使用一个jquery对象作为简单的订阅者发布者
	var pubSub = jQuery({})

	//一个data元素可以在表单中指明绑定: data-bind-<object_id>='<property_name>'
	var data_attr = 'bind-' + object_id
	var message = object_id + ':change'

	//使用data-binding属性和代理来监听那个元素上的变化事件
	// 以便变化能够“广播”到所有的关联对象
	jQuery(document).on('change', '[data-' + data_attr + ']', function(evt) {
		var $input = jQuery(this)
		pubSub.trigger(message, [$input.data(data_attr), $input.val()])
	})

	//PubSub将变化传播到所有的绑定元素，设置input标签的值活着其他标签的html内容
	pubSub.on(message, function(evt, prop_name, new_val) {
		jQuery('[data-'+ data_attr + '=' + prop_name +']').each(function() {
			var $bound = jQuery(this)
			if($bound.is('input, textarea, select')) {
				$bound.val(new_val)
			} else {
				$bound.html(new_val)				
			}
		})
	})

	return pubSub
}

//User模型
function User(uid) {
	var binder = new DataBinderHtml(uid)

	user = {
		attributes: {},

		//属性设置使用数据绑定器PubSub来发布变化
		set: function(attr_name, val) {
			this.attributes[attr_name] = val;
			binder.trigger(uid + ':change', [attr_name, val, this])
			console.log(user.attributes)
		},

		get: function(attr_name) {
			return this.attributes[attr_name]
		},

		_binder: binder
	}

	binder.on(uid + ':change', function(evt, attr_name, new_val, initiator) {
		if(initiator !== user) {
			user.set(attr_name, new_val)
		}
	})

	return user
}

//现在，无论我们什么时候想把模型的属性绑定到UI的一部分上，我们只需要在相应的HTML元素上设置一个合适的data属性即可。
var user = new User('name')
user.set('name', 888)















