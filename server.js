// 导入 http 模块
const http = require('http');

// 指定服务器的主机名 hostname 和端口号 port
const hostname = 'localhost';
// const hostname = '127.0.0.1';
const port = 3000;

// 用 http.createServer 创建 HTTP 服务器，参数为一个回调函数，接受一个请求对象 req 和响应对象 res，并在回调函数中写入响应内容（状态码 200，类型为 HTML 文档，内容为 Hello World）
const server = http.createServer((req, res) => {
  res.statusCode = 200; //手动指定 HTTP 状态码
  res.setHeader('Content-Type', 'text/html'); //手动指定 HTTP 头部字段
  res.end('<h1>Hello World 00111</h1><h2>Hello World 00222</h2>'); //返回内容
});

// 在指定的端口开启服务器
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
