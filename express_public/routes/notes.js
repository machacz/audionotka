var express = require('express');
var router = express.Router();

function loggedInOnly(req, res, next) {
  console.log(req.user)
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

/* GET home page. */
router.get('/', loggedInOnly, function(req, res, next) {
  res.render('notes/index', { });
});

router.get('/record', loggedInOnly, function(req, res, next) {
  res.render('notes/record', { });
});

module.exports = router;
