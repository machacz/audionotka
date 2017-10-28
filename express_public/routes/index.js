
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get('/about', function(req, res, next) {
  res.render('about', { });
});

router.get('/howto', function(req, res, next) {
  res.render('howto', { });
});

router.get('/blog', function(req, res, next) {
  res.render('blog', { });
});


module.exports = router;
