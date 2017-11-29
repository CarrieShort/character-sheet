const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', (next, done) => {
  var user = this;
  
  if (!user.isModified('password')) return next();
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
    
  });
  
});

module.exports = exports = mongoose.model('User', userSchema);