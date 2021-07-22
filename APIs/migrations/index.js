const path = require('path');
const bcrypt = require('bcryptjs');
const root = path.dirname(require.main.filename);
const db = require('../models');
const fs = require('fs');
const assert = require('assert')

const UserDetail = db.UserDetail;

exports.initial = async () => {
  try { 
    const userCount = await db.User.countDocuments({});
    if (!userCount) {
      const admin = await new db.User({
        username: 'admin', password: bcrypt.hashSync('admin', 8),
        email: 'admin@smartfarm.com', 
        status: true, is_admin: true
      }).save();
      const adminDetail = await new db.UserDetail({
        firstname: 'General', lastname: 'Admin'
      }).save();
      admin.detail = adminDetail;
      await admin.save();
      console.log("Created 'admin' user successful.");   
    }
  }
  catch (err) {
    console.log(err)
  }
}