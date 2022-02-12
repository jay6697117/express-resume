// 指定服务器的主机名 hostname 和端口号 port
const hostname = 'localhost';
const port = 3000;

//创建一个 Express 服务器对象
const express = require('express');
const app = new express();

let indexMiddlewareStr;
let loggingMiddlewareStr;

const indexMiddleware = (req, res, next) => {
  const time = new Date();
  indexMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  next();
};
const loggingMiddleware = (req, res, next) => {
  const time = new Date();
  loggingMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  next();
};

app.use(indexMiddleware);
app.use(loggingMiddleware);

// 定义了主页 / index的路由
app.get('/', indexMiddleware, (req, res) => {
  res.send(`indexMiddleware: &nbsp;&nbsp; ${indexMiddlewareStr}`);
});

// 定义了主页 / loggingMiddleware的路由
app.get('/loggingMiddleware', loggingMiddleware, (req, res) => {
  res.send(`loggingMiddleware: &nbsp;&nbsp; ${loggingMiddlewareStr}`);
});

// 调用 listen 方法开启服务器
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
