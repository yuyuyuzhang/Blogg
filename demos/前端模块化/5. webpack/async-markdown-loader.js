// 导出一个处理函数
module.exports = source => {
  console.log(source)
  // 必须返回 JS 代码
  return "console.log('<h1>hello async-markdown-loader</h1>')"
}