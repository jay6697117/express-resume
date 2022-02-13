const path = require('path');
const express = require('express');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

// 指定服务器的主机名 hostname 和端口号 port
const hostname = 'localhost';
const port = 3000;

//创建一个 Express 服务器对象
const app = new express();

// 指定模板存放目录
app.set('views', path.resolve(__dirname, './views'));
// 指定模板引擎为 Handlebars
app.set('view engine', 'hbs');

//使用静态文件服务
app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 定义了 broken路由
app.get('/broken', (req, res) => {
  throw new Error('Broken!');
});

app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error('err.stack:', err.stack);
  res.status(500).render('500');
});

// 调用 listen 方法开启服务器
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
