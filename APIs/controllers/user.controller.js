const { passwordStrength } = require('check-password-strength')
const config = require('../config');
const db = require('../models');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// List
exports.list = async (req, res) => {
  try {
    const data = req.query;
    const users = await db.User.find().populate('detail');
    res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Create
exports.create = async (req, res) => {
  try {
    const data = req.body;
    if(!data.password || !data.confirmPassword || data.password != data.confirmPassword) {
      return res.status(409).send({message: 'Passwords are mismatched.'});
    }

    const dupUsername = await db.User.findOne({username: data.username}, ['id']);
    if(dupUsername) {
      return res.status(409).send({message: 'Username is already in use.'});
    }

    const dupEmail = await db.User.findOne({email: data.email}, ['id']);
    if(dupEmail) {
      return res.status(409).send({message: 'Email is already in use.'});
    }

    const user = await new db.User({
      username: data.username, 
      password: bcrypt.hashSync(data.password, 8),
      email: data.email, 
      avatar: data.avatar, 
      status: true, 
      is_admin: false
    }).save();
    const userDetail = await new db.UserDetail({
      user: user, firstname: data.detail.firstname, lastname: data.detail.lastname
    }).save();
    user.detail = userDetail;
    await user.save();
    
    res.status(200).send(true);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Read
exports.read = async (req, res) => {
  try {
    const data = req.query;
    const user = await db.User.findById(sanitize(data.userId)).populate('detail');
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const data = req.body;

    var isPassword = false;
    if(data.password && data.confirmPassword) {
      isPassword = true;
      if(!data.password || !data.confirmPassword || data.password != data.confirmPassword) {
        return res.status(409).send({message: 'Passwords are mismatched.'});
      }
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
    
    const userDetail = await db.UserDetail.findOne({ user: sanitize(data.id) });
    await userDetail.updateOne({
      firstname: data.detail.firstname,
      lastname: data.detail.lastname
    }, []);
    
    const update = await db.User.findById(sanitize(data.id));
    if(isPassword) {
      await update.updateOne({
        username: data.username,
        email: data.email,
        avatar: data.avatar,
        password: bcrypt.hashSync(data.password, 8)
      }, []);
    } else {
      await update.updateOne({
        username: data.username,
        email: data.email,
        avatar: data.avatar
      }, []);
    }
    
    res.status(200).send(true);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const data = req.body;
    await db.UserDetail.deleteOne({ user: sanitize(data.id) });
    await db.User.deleteOne({ _id: sanitize(data.id) });
    res.status(200).send(true);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};