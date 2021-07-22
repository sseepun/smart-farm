const db = require('../models');

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const username = await db.User.findOne({ username: req.body.username })
    const email = await db.User.findOne({ email: req.body.email })
    if (username) {
      return res.status(400).send({ message: 'Username is already in use.' });
    } else if (email) {
      return res.status(400).send({ message: 'Email is already in use.' });
    }
    next();
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

adminUpdateUserCheckDuplicateUsername = async (req, res, next) => {
  try {
    if (req.body.old_username === req.body.new_username) {
      next();
    } else {
      const user = await db.User.findOne({ username: req.body.new_username })
      if (user) {
        return res.status(400).send({ message: 'Username is already in use.' });
      }
      next();
    }
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

adminUpdateUserCheckDuplicateEmail = async (req, res, next) => {
  try {
    if (req.body.old_email === req.body.new_email) {
      next();
    } else {
      const user  = await db.User.findOne({ email: req.body.new_email })
      if (user) {
        res.status(400).send({ message: 'Email is already in use.' });
        return;
      }
      next();
    }
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
}

const verifySignup = {
  checkDuplicateUsernameOrEmail,
  adminUpdateUserCheckDuplicateUsername,
  adminUpdateUserCheckDuplicateEmail,
};

module.exports = verifySignup;