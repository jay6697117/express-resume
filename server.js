// 指定服务器的主机名 hostname 和端口号 port
const hostname = 'localhost';
const port = 3000;

//创建一个 Express 服务器对象
const express = require('express');
const app = new express();
app.set('views', 'views');
app.set('view engine', 'hbs');

let indexMiddlewareStr;
let contactMiddlewareStr;

const indexMiddleware = (req, res, next) => {
  const time = new Date();
  indexMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  next();
};
const contactMiddleware = (req, res, next) => {
  const time = new Date();
  contactMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  next();
};

app.use(indexMiddleware);
app.use(contactMiddleware);

// 定义了主页 / index的路由
app.get('/', indexMiddleware, (req, res) => {
  console.log('index日志输出:', `indexMiddleware: &nbsp;&nbsp; ${indexMiddlewareStr}`);
  res.render('index');
});

// 定义了主页 / loggingMiddleware的路由
app.get('/contact', contactMiddleware, (req, res) => {
  console.log('contact日志输出:', `contactMiddleware: &nbsp;&nbsp; ${contactMiddlewareStr}`);
  res.render('contact');
});

// 调用 listen 方法开启服务器
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
