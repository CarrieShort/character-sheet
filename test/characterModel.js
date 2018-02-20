const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
process.env.MONGODB_URI = 'mongodb://localhost/testdb';
const Character = require(__dirname + '/../models/character');
const testCharacter = require(__dirname + '/../test/testCharacter');

describe('the Character schema', () => {
  before((done) =>{
    mockgoose.prepareStorage().then(() => {
    mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, () =>{
      done();
    });
});
});
after ((done)=> {
  mockgoose.helper.reset().then(() => {
    mongoose.connection.close(done)
  });
});
  it('new character is saved when good object is passed to Character Model', (done) => {
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
