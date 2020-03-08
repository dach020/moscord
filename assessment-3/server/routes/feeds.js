var express = require('express');
var router = express.Router();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('d2ee1b47d5104682908a5750abe86cff');

router.get('/', async function(req, res, next) {
  newsapi.v2.sources({
    country: 'us',
    language: 'en'
  }).then((response) => {
    res.json(response);
  })
});

router.get('/source', async function(req, res, next) {
  newsapi.v2.everything({
    sources: req.query.sources,
    pageSize: 10,
    page: req.query.page
  }).then((response) => {
    res.json(response);
  }).catch((err) => {
    res.status(404);
    res.json({ error: err });
  });
});

module.exports = router;
