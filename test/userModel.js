const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
process.env.MONGODB_URI = 'mongodb://localhost/testdb';
const User = require(__dirname + '/../models/user');
describe('the User schema', () => {
  before((done) =>{
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, () =>{
        done();
      });
});

});
after ((done)=> {
  mockgoose.helper.reset().then(() => {
    mongoose.connection.close(done);
  });
});

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
    var newUser = new User({email: 'testname@test.com', password: 'testpass', name:'jake'});
    newUser.save((err) => {
      expect(newUser.email).to.equal('testname@test.com');
      expect(newUser.password).not.to.equal('testpass');
      done();
    });

  });
})
