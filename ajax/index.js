/**
 * @author watson
 * @version V1.0
 * @since 2018/04/11
 * @content XMLHttpRequest对象
 **/

const xhr = new XNLHttpRequest()
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    try {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        success(xhr.responseText)
      } else {
        fail(xhr.status)
      }
    } catch(ex) {
      ontimeout(ex)
    }
  }
}
xhr.open('get', 'url', true)
xhr.timeout = 10000
xhr.ontimeout = function(ex) {
  console.log(ex)
}
xhr.send(null)

function success(res) {
  console.log(res)
}

function fail(res) {
  console.log(res)
}



//请求头部
/**
 * Connection: 浏览器与服务器之间连接的类型
 * cookie: 当前页面设置的任何cookie
 * host: 发出请求的页面的所在的域
 * referer: 发出请求页面的url
 */
//设置请求头部
/**
 * setRequestHeader(头部字段名称, 头部字段的值)
 */
//使用xhr对象获取响应头部信息
/**
 * var myHeader = xhr.getResponseHeader('MyHeader')
 * var allHeadersString = xhr.getAllResponseHeader()
 */

//post请求
/**
 * 默认情况下，服务器对post请求和提交表单请求处理不一样
 * post请求，服务器必须有程序来读取发送古来的原始数据，从中解析有用的部分
 * 使用xhr对象模仿表单提交：首先将 Content-Type 头部信息设置为 application/x-www-form-urlencoded, 就是表单提交是的内容类型
 *                      其次以适当的格式创建一个字符串
 */

//跨域资源共享
/**
 * cors 跨域资源共享
 * 本质: 使用自定义的http头部，让浏览器与服务器进行沟通
 * 如在请求头部加入自定义的头部 Origin:http://www.watson.net
 * 如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin:http://www.watson.net
 */