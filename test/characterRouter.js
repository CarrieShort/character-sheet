const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;
const port = process.env.PORT = 5000;
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const Character = require(__dirname + '/../models/character');
process.env.MONGODB_URI = 'mongodb://localhost/testdb';
let server;

describe('route that adds character', () => {
  before((done) =>{
      mockgoose.prepareStorage().then(() => {
      mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, () =>{
        server = require(__dirname + '/../server');
        done();
      });
    });
  });
  after ((done)=> {
    mockgoose.helper.reset().then(() => {
      mongoose.connection.close(() => {
        server.close(()=>{
          done();
        });
      })
    });
  });
  before((done) => {
    if (mongoose.connection.db) return done();
    mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true }, done);
  });

  it('should create a character via the post route', (done) => {
    request('localhost:' + port)
    .post('/api/create')
    .send({
      characterName: 'test character',
      playerId: 'abc123'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.characterName).to.eql('test character');
      expect(res.body.playerId).to.eql('abc123');
      expect(res.body.race).to.eql('human');
      expect(res.body.class).to.eql('fighter');
      done();
    });
  });
});

describe('routes that modify an existing character', () => {
  before((done) =>{
      mockgoose.prepareStorage().then(() => {
      mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true}, () =>{
        server.listen(port, () => {
          done();
        });
      });
    });
  });
  beforeEach((done) => {
    var newCharacter = new Character({
      characterName: 'foo character',
      playerId: 'foo123'
    });
    newCharacter.save((err, data) => {
      if (err) console.log(err);
      this.character = data;
      done();
    });
  });
  afterEach((done) => {
    this.character.remove((err) => {
      if (err) console.log(err);
      done();
    });
  });
  after ((done)=> {
    mongoose.connection.db.dropDatabase(() => {
     mongoose.disconnect(() => {
       server.close(()=>{
         done();
       });
     });
    });
  });

  it('should get all characters in database', (done) => {
    request('localhost:' + port)
    .get('/api/characters')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(1);
      expect(res.body[0].characterName).to.eql('foo character');
      expect(res.body[0].playerId).to.eql('foo123');
      expect(res.body[0].race).to.eql('human');
      expect(res.body[0].class).to.eql('fighter');
      done();
    });
  });

  it('should change the character on PUT', (done) => {
    request('localhost:' + port)
    .put('/api/character/' + this.character._id)
    .send({
      characterName: 'Different Name'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.nModified).to.eql(1);
      done();
    });
  });
  it('should remove the character on DELETE', (done) => {
    request('localhost:' + port)
    .delete('/api/character/' + this.character._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.msg).to.eql('character has been deleted');
      done();
    });
  });
});
