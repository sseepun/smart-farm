module.exports = function(app) {
  var router = require('express').Router();
  const { authJwt } = require('../middlewares');
  const FarmController = require('../controllers/farm.controller');

  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  router.get(
    '/list',
    [ authJwt.verifyToken ],
    FarmController.list
  );

  router.post(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    FarmController.create
  );

  router.get(
    '/',
    [ authJwt.verifyToken ],
    FarmController.read
  );

  router.patch(
    '/',
    [ authJwt.verifyToken ],
    FarmController.update
  );

  router.delete(
    '/',
    [ authJwt.verifyToken, authJwt.isAdmin ],
    FarmController.delete
  );

  app.use('/farm', router);
};