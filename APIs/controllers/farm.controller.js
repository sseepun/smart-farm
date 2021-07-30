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
    if(data.userId) {
      const farms = await db.Farm.find({ user: data.userId })
        .populate({ path: 'user', populate: { path: 'detail' } });
      res.status(200).send(farms);
    } else {
      const farms = await db.Farm.find()
        .populate({ path: 'user', populate: { path: 'detail' } });
      res.status(200).send(farms);
    }
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Create
exports.create = async (req, res) => {
  try {
    const data = req.body;

    const user = await db.User.findById(sanitize(data.user.id));
    if(!user) {
      return res.status(409).send({message: 'User not found.'});
    }

    const farm = await db.Farm({
      name: data.name, 
      description: data.description,
      avatar: data.avatar,
      user: user,
      node_id: data.nodeId
    }).save();
    
    res.status(200).send(true);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Read
exports.read = async (req, res) => {
  try {
    const data = req.query;
    const farm = await db.Farm.findById(sanitize(data.farmId))
      .populate({ path: 'user', populate: { path: 'detail' } });
    res.status(200).send(farm);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const data = req.body;
    const update = await db.Farm.findById(sanitize(data.id));
    await update.updateOne({
      name: data.name,
      description: data.description,
      node_id: data.nodeId
    }, []);
    res.status(200).send(true);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const data = req.body;
    await db.Farm.deleteOne({ _id: sanitize(data.id) });
    res.status(200).send(true);
  } catch (err) {
    return res.status(500).send({message: 'Internal server error.'});
  }
};