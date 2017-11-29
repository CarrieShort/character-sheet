const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const port = process.env.PORT = 5000;
const User = require(__dirname + '/../models/user');
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
})