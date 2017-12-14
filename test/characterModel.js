const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const port = process.env.PORT = 5000;
const mongoose = require('mongoose');
const Character = require(__dirname + '/../models/character');
const testCharacter = require(__dirname + '/../test/testCharacter');
process.env.MONGODB_URI = 'mongodb://localhost/testdb';
const server = require(__dirname + '/../server');
describe('the Character schema', () => {
  before((done)=>{
    server.listen(port, () =>{
      console.log('server up on port ' + port);
      done();
    });
  });
  after((done) => {
    server.close(()=>{
      console.log('server closes');
      done();
    })
  });
  it('new character is saved when object is passed to Character Model', (done) => {
    var newCharacter = new Character(testCharacter.good);
    newCharacter.save((err, product) => {
      expect(product.characterName).to.equal(testCharacter.good.characterName);
      expect(product.level).to.equal(testCharacter.good.level);
      expect(err).to.equal(null);
      done();
    });
  });
  it('should fail to save when required fields are missing', (done) => {
    var newCharacter = new Character(testCharacter.bad);
    newCharacter.save((err, product) => {
      expect(err).to.exist;
      expect(product).to.not.exist;
      done();
    });
  });
});
