module.exports = function(app) {
  var router = require('express').Router();
  const { authJwt } = require('../middlewares');
  const AuthController = require('../controllers/auth.controller');

  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  router.post(
    '/refresh-token',
    AuthController.refreshToken
  );

  router.post(
    '/signin',
    AuthController.signin
  );

  router.patch(
    '/profile',
    [ authJwt.verifyToken ],
    AuthController.profileUpdate
  );

  router.patch(
    '/password',
    [ authJwt.verifyToken ],
    AuthController.passwordUpdate
  );

  app.use('/auth', router);
};