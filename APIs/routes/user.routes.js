module.exports = function(app) {
  var router = require('express').Router();
  const { authJwt } = require('../middlewares');
  const UserController = require('../controllers/user.controller');

  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  router.get(
    '/list',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    UserController.list
  );

  router.post(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    UserController.create
  );

  router.get(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    UserController.read
  );

  router.patch(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    UserController.update
  );

  router.delete(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    UserController.delete
  );

  app.use('/user', router);
};