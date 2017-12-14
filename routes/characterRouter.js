const Router = require('express').Router;
const Character = require(__dirname + '/../models/character');
const bodyParser = require('body-parser').json();
const characterRouter = module.exports = exports = new Router();

var missingField = function (req, res, fieldName, message) {
  if (!req.body[fieldName]) return res.status(500).json({ msg: message});
}

characterRouter.post('/create', bodyParser, (req, res) => {
  missingField(req, res, 'playerId', 'missing player id, you may not be logged in or something went wrong when trying to add a character to your account');
  var newCharacter = new Character(req.body);
  newCharacter.save((err, character) => {
    if (err) return res.status(500).json({ msg: 'could not create character' });
    return res.status(200).json({status: character.characterName + ' has been created'});
  });
});

characterRouter.get('/characters', (req, res) => {
  Character.find({}, (err, data) => {
    if (err) return res.status(500).json({ msg: 'there was an error' });
    res.status(200).json(data);
  });
});
