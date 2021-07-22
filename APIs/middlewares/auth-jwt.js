const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const config = require('../config');
const db = require('../models');

// Verify JWT
verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(403).send({message: 'No token provided.'});
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(500).send({message: 'Internal server error.'});
      }
      req.userId = decoded.id;
      next();
    })
  }
  catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Check Admin
isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.user_id);
    if (user.status) {
      if (user.is_admin) {
        return next();
      }
      return res.status(403).send({message: 'Required an admin account.'});
    }
    return res.status(403).send({message: 'User is deactivated.'});
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

isFarmBelongToUser = async (req, res, next) => {
  try {
    const farm = await db.Farm.findById(sanitize(req.params.farm_id)).populate('user')
    if (farm.user.is_admin || (farm.user._id).toString() === req.user_id) {
      return next();
    }
    return res.status(403).send({message: 'No permission.'});
  }
  catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isFarmBelongToUser
};

module.exports = authJwt;
