/**
 * @author watson
 * @version V1.0
 * @since 2018/04/11
 * @content Web Sockets
 * web sockets目标是在一个单独的持久连接上提供全双工、双向通信
 * 描述
 *      在javascript中创建了web sockets之后，会有一个http请求发送到浏览器以发起连接，在取得服务器响应后，
 *      建立的连接会使用http升级从http协议交换为 web sockets 协议，就是说，使用标准的http服务器无法实现web sockets，
 *      只有支持这种协议的专门服务器才能正常工作
 * 使用场景
 *      面对某个具体用例，在考虑使用 sse 还是使用 web sockets ？可以以下两点分析:
 *      第一: 你是否有自由度建立和维护 web sockets 服务器，sse使用常规http服务器通信，而 web sockets 协议不用于http，现有服务器不能使用 web sockets 通信
 *      第二: 到底需不需要双向通信，如果只需读取服务器数据（如比赛成绩），那么sse容易实现，如果必须双向通信（如聊天室），那么 web sockets 更好，不过组合使用xhr和sse也是能实现双向通信的；
 **/

