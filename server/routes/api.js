var express = require('express');
var router = express.Router();
var login = require('../api/login');

router.post('/auth/jwt/token', function(req, res, next) {
  login.login(req,res);
});
router.get('/admin/user/front/info', function(req, res, next) {
  login.getUser(req,res);
});

module.exports = router;
