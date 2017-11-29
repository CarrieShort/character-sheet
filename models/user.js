const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  password: {
    type: String
  }
})