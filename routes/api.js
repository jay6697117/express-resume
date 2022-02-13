const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: '图雀社区-666', website: 'https://tuture.co' });
});

router.get('/new-get', (req, res) => {
  res.json({ msg: 'get 新的篇章，即将开始' });
});

router.post('/new-post', (req, res) => {
  res.status(201).json({ msg: 'post 新的篇章，即将开始' });
});

module.exports = router;
