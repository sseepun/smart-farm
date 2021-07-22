module.exports = function(app) {
  var router = require('express').Router();
  const AuthController = require('../controllers/auth.controller');

  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  router.get(
    '/check-token',
    AuthController.checkToken
  );

  router.post(
    '/signin',
    AuthController.signin
  );

  router.get(
    '/clear-cookie',
    AuthController.clearCookie
  );

  app.use('/auth', router);
};