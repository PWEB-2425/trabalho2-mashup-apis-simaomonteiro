const express = require('express');
const axios = require('axios');
const router = express.Router();

function isAuth(req, res, next) {
  if (!req.session.userId) return res.redirect('/auth/login');
  next();
}

const path = require('path');

router.get('/', isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/club.html'));
});


router.post('/', isAuth, async (req, res) => {
  const clubName = req.body.club;
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(clubName)}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.json({ error: 'Erro ao obter informações do clube.' });
  }
});


module.exports = router;