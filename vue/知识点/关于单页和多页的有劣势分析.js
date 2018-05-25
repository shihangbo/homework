/**
 * @author watson
 * @version V1.0
 * @since 2018/05/25
 * @content 关于vue单页和多页的有劣势分析
 */

var spa = {
  advantage: {
    '1': '单页主要优势在于不存在页面切换问题，因为只在同一个页面间切换，会更流畅，而且可以附加各种动画和过度效果，用户体验更好',
    '2': '可以用到vue的路由和状态管理',
  },
  disadvantaged: {
    '1': '所有代码被打包在一个js文件里，js文件内容过大，导致的首屏加载问题'
  },
}

var multipage = {
  advantage: {
    '1': '单个页面体积小，加载速度有保证',
  },
  disadvantaged: {
    '1': '随着项目越做越大，页面越来越多，使用webpack编译的时间越来越长，热更新速度很慢，开发效率降低',
    '2': '多个页面数据共享问题，状态管理问题',
  },
}