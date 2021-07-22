const { passwordStrength } = require('check-password-strength')
const config = require('../config');
const db = require('../models');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Check Token
exports.checkToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;
    if (!refreshToken) {
      return res.status(403).send({message: 'No refresh token provided.'});
    }
    jwt.verify(accessToken, config.secret, (err, decoded) => {
      if(err) {
        console.log(err.message);
        if (err.message ==='jwt expired' || err.message === 'jwt must be provided') {
          jwt.verify(refreshToken, config.refreshTokenSecret, async (err, decodedRefreshToken) => {
            if (err) {
              return res.status(401).send({message: 'Refresh token expired.'});
            }
            const user = await db.User.findById(decodedRefreshToken.id)
            if (refreshToken === user.refresh_token) {
              const accessToken = jwt.sign({id: user.id}, config.secret, {
                expiresIn: process.env.TOKEN_LIFE
              });
              const refreshToken = jwt.sign({id: user.id}, config.refreshTokenSecret, {
                expiresIn: process.env.REFRESH_TOKEN_LIFE
              });
              await user.updateOne({refresh_token: refreshToken}, []);
              res.cookie('refreshToken', refreshToken, {
                maxAge: process.env.REFRESH_TOKEN_LIFE,
                httpOnly: true,
                secure: false
              });
              res.cookie('accessToken', accessToken, {
                maxAge: process.env.TOKEN_LIFE,
                httpOnly: true,
                secure: false
              });
              console.log('New refresh token :',refreshToken);
              console.log('New token :', accessToken);
              req.userId = decodedRefreshToken.id;
              req.accessToken = accessToken;
              res.status(200).send({message: 'OK'})
            } else {
              return res.status(401).send({message: 'Refresh token expired.'});
            }
          });
        } else {
          return res.status(401).send(err);
        }
      } else {
        req.userId = decoded.id;
        res.status(200).send({message: 'OK'});
      }
    });
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
}

// Sign In
exports.signin = async (req, res) => {
  try {
    const user = await db.User.findOne({ username: sanitize(req.body.username) });
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
    res.cookie('refreshToken', refreshToken, {
      maxAge: process.env.REFRESH_TOKEN_LIFE,
      httpOnly: true,
      secure: false
    });
    res.cookie('accessToken', accessToken, {
      maxAge: process.env.TOKEN_LIFE,
      httpOnly: true,
      secure: false
    });
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: userCallback.avatar,
    });
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Clear Cookie
exports.clearCookie = (req, res) => {
  res.cookie('refreshToken', '', {
    maxAge: 0,
    httpOnly: true,
    secure: false
  });
  res.cookie('accessToken', '', {
    maxAge: 0,
    httpOnly: true,
    secure: false
  });
  res.status(200).send({message: 'OK'});
}