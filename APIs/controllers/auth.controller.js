const { passwordStrength } = require('check-password-strength')
const config = require('../config');
const db = require('../models');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(403).send({message: 'No refresh token provided.'});
    }
    jwt.verify(refreshToken, config.refreshTokenSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).send({message: 'Refresh token expired.'});
      }
      const user = await db.User.findById(decodedToken.id).populate('detail');
      if (!user) {
        return res.status(401).send({message: 'Refresh token expired.'});
      } 
      
      if (refreshToken === user.refresh_token) {
        const accessToken = jwt.sign({id: user.id}, config.secret, {
          expiresIn: process.env.TOKEN_LIFE
        });
        const refreshToken = jwt.sign({id: user.id}, config.refreshTokenSecret, {
          expiresIn: process.env.REFRESH_TOKEN_LIFE
        });

        await user.updateOne({refresh_token: refreshToken}, []);
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          is_admin: user.is_admin,
          detail: user.detail,
          access_token: accessToken,
          refresh_token: refreshToken
        });
      } else {
        return res.status(401).send({message: 'Refresh token expired.'});
      }
    });
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
}

// Sign In
exports.signin = async (req, res) => {
  try {
    const user = await db.User.findOne({username: sanitize(req.body.username)}).populate('detail');
    if (!req.body.username || !user) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid username or password.'
      });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!req.body.password || !passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid username or password.'
      });
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
      expiresIn: process.env.TOKEN_LIFE
    });
    const refreshToken = jwt.sign({id: user.id}, config.refreshTokenSecret, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE
    });

    const userCallback = await db.User.findById(sanitize(user._id));
    if (!userCallback.status) {
      return res.status(403).send({message: 'User is deactivated.'});
    }

    await userCallback.updateOne({refresh_token: refreshToken}, []);
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      is_admin: user.is_admin,
      detail: user.detail,
      access_token: accessToken,
      refresh_token: refreshToken
    });
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Sign In
exports.profileUpdate = async (req, res) => {
  try {
    const data = req.body;
    if(req.user_id != data.id) {
      return res.status(401).send({message: 'This is not your profile.'});
    }

    const dupUsername = await db.User.findOne({
      username: data.username, _id: { $not: { $eq: sanitize(data.id) } }
    }, ['id']);
    if(dupUsername) {
      return res.status(409).send({message: 'Username is already in use.'});
    }

    const dupEmail = await db.User.findOne({
      email: data.email, _id: { $not: { $eq: sanitize(data.id) } }
    }, ['id']);
    if(dupEmail) {
      return res.status(409).send({message: 'Email is already in use.'});
    }
    
    const userDetail = await db.UserDetail.findOne({ user: sanitize(req.user_id) });
    await userDetail.updateOne({
      firstname: data.detail.firstname,
      lastname: data.detail.lastname
    }, []);
    
    const user = await db.User.findById(sanitize(data.id));
    await user.updateOne({
      username: data.username,
      email: data.email,
      avatar: data.avatar
    }, []);
    
    const result = await db.User.findById(req.user_id).populate('detail');
    res.status(200).send({
      id: result._id,
      username: result.username,
      email: result.email,
      avatar: result.avatar,
      is_admin: result.is_admin,
      detail: result.detail
    });
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};