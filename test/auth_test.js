const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const port = process.env.PORT = 5000;
const mongoose = require('mongoose');
const User = require(__dirname + '/../models/user');
// process.env.MONGODB_URI = 'mongodb://localhost/testdb';
// const server = require(__dirname + '/../server');
describe('the User schema', () => {
  it('should require name and password', (done) => {
    var newUser = new User();
    newUser.validate((err) => {
      expect(err.errors.email).to.exist;
      expect(err.errors.password).to.exist;
      done();
    });
  });
  it('should throw an error if the email is an invalid format', (done) => {
    var newUser = new User({email: 'i am a test', password: 'testpass'});
    newUser.validate((err) => {
      expect(newUser.errors.email).to.exist;
      done();
    });
  });
  it('should hash the password before saving', (done) => {
    var newUser = new User({email: 'blue@test.com', password: 'testpass'});
    newUser.save((err) => {
      expect(newUser.email).to.equal('blue@test.com');
      expect(newUser.password).to.not.equal('testpass');
      done();
    });
  });
})