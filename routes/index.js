const express = require('express');
const router = express.Router();

let contactMiddlewareStr;
//联系我们中间件
const contactMiddleware = (req, res, next) => {
  const time = new Date();
  contactMiddlewareStr = `[${time.toLocaleString()}]\n: ${req.method} ${req.url}`;
  console.log('contactMiddlewareStr:', contactMiddlewareStr);
  next();
};

router.get('/', (req, res) => {
  res.render('index'); // 渲染views/index.hbs模版
});

// 定义了主页 / loggingMiddleware的路由
router.get('/contact', contactMiddleware, (req, res) => {
  res.render('contact', { str: contactMiddlewareStr }); // 渲染views/contact.hbs模版
});

module.exports = router;
