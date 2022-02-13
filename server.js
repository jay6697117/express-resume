const path = require('path');
// 指定服务器的主机名 hostname 和端口号 port
const hostname = 'localhost';
const port = 3000;

//创建一个 Express 服务器对象
const express = require('express');
const app = new express();

// 指定模板存放目录
app.set('views', path.resolve(__dirname,'./views'));
// 指定模板引擎为 Handlebars
app.set('view engine', 'hbs');

let indexMiddlewareStr;
let contactMiddlewareStr;

//主页中间件
const indexMiddleware = (req, res, next) => {
  const time = new Date();
  indexMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  next();
};
//联系我们中间件
const contactMiddleware = (req, res, next) => {
  const time = new Date();
  contactMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  next();
};

//使用中间件
app.use(indexMiddleware);
app.use(contactMiddleware);
//使用静态文件服务
app.use(express.static(path.resolve(__dirname,'./public')))


// 定义了主页 / index的路由
app.get('/', indexMiddleware, (req, res) => {
  console.log('index日志输出:', `indexMiddleware: &nbsp;&nbsp; ${indexMiddlewareStr}`);
  res.render('index'); // 渲染views/index.hbs模版
});

// 定义了主页 / loggingMiddleware的路由
app.get('/contact', contactMiddleware, (req, res) => {
  console.log('contact日志输出:', `contactMiddleware: &nbsp;&nbsp; ${contactMiddlewareStr}`);
  res.render('contact'); // 渲染views/contact.hbs模版
});

// 定义了 broken路由
app.get('/broken', (req, res) => {
  throw new Error('Broken!');
});

app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

// 调用 listen 方法开启服务器
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
