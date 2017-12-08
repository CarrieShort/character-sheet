const Router = require('express').Router;
const User = require(__dirname + '/../models/user');
const bodyParser = require('body-parser').json();
const passport = require('passport');
const authRouter = module.exports = exports = new Router();

authRouter.post('/signup', bodyParser, (req, res) => {
  if (!req.body.email) return res.status(500).json({ msg: 'missing email' });
  if (!req.body.password) return res.status(500).json({ msg: 'missing password' });
  var newUser = new User(req.body);

  newUser.save((err, user) => {
    console.log('some stuff: ', err, user);
    if (err && err.errors && err.errors.email && err.errors.email.message) {
      return res.status(500).json({ msg: err.errors.email.message });
    }
    if (err) return res.status(500).json({ msg: 'could not create user' });
    passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
    });
  }).then((user)=>{
    console.log('what ', user);
  });;
});
