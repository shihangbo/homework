/**
 * @author watson
 * @version V1.0
 * @since 2018/05/16
 * @content input的一些思考
 * 1.移动端底部input被弹出的键盘遮挡;
 * 2.控制input显/隐密码;
 * 3.在input中输入emoji表情导致请求失败;
 * 4.textarea多行输入显示换行,显示的时候换行设置;
 * 5.输入框首尾清除空格-trim();
 * 6.在input中监听键盘事件;
 */

//解决1 -- https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
document.querySelector('#inputId').scrollIntoView();// 只要在input的点击事件，或者获取焦点的事件中，加入这个api就好了
//解决1 -- 方案2
window.addEventListener('resize', function() {
  if (document.activeElement.tagName === 'INPUT' ||
      document.activeElement.tagName === 'TEXTAREA') {
    window.setTimeout(function() {
      if('scrollIntoView' in document.activeElement) {
        document.activeElement.scrollIntoView();
      } else {
        document.activeElement.scrollIntoViewIfNeeded();
      }
    }, 0)
  }
})


//解决2
function show() {
  const input = document.getElementById('inputId')
  input.type = input.type === 'password' ? 'text' : 'password'
}

//解决3 -- 移动前端手机输入法自带emoji表情字符处理, https://www.bbsmax.com/A/nAJvkxjY5r/

//解决4 -- CSS属性: white-space: pre-line; 或 white-space: pre-warp;

//解决5 -- 一般使用:字符串的原生方法trim() 从一个字符串的两端删除空白字符;trim() 方法并不影响原字符串本身，它返回的是一个新的字符串。;
var nStr = document.getElementById('inputId').value.trim()
//vue清除方法 -- 修饰符 -- <input v-model.tirm='msg'>

//解决6 -- 原生绑定 <input onkeydown="keydownMsg(event)" type="text">
function keydownMsg(key) {
  keyCode = key.keyCode //获取按键代码
  if (keyCode === 13) { //判断是否回车键
    //do something
  }
}
//vue按键修饰符 -- <input @keyup.enter="enterActive">

