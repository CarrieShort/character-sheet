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

userSchema.pre('save', function(next, done) {
  var user = this;
  
  if (!user.isModified('password')) return next();
  
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
      done();
    });
    
  });
  
});

module.exports = exports = mongoose.model('User', userSchema);