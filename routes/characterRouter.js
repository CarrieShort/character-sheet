const Router = require('express').Router;
const Character = require(__dirname + '/../models/character');
const bodyParser = require('body-parser').json();
const characterRouter = module.exports = exports = new Router();

var missingField = function (req, res, fieldName, message) {
  return res.status(500).json({ msg: 'missing ' + fieldName + ', ' + message});
  return false;
}

characterRouter.post('/create', bodyParser, (req, res) => {
  if(!req.body.playerId)
  return missingField(req, res, 'playerId', 'you may not be logged in or something went wrong when trying to add a character to your account.');
  var newCharacter = new Character(req.body);
  newCharacter.save((err, character) => {
    if (err) return res.status(500).json({ msg: 'could not create character' });
    return res.status(200).json(character);
  });
});

// get all character data
characterRouter.get('/characters', (req, res) => {
  Character.find({}, (err, data) => {
    if (err) return res.status(500).json({ msg: 'could not find character with matching id' });
    res.status(200).json(data);
  });
});

// get single character data
characterRouter.get('/character/:id', (req, res) => {
  Character.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return res.status(500).json({ msg: 'there was an error' });
    res.status(200).json(data);
  });
});

// update single character data
characterRouter.put('/character/:id', bodyParser, (req, res) => {
  var characterData = req.body;
  delete characterData._id;
  Character.update({ _id: req.params.id }, characterData, (err, data) => {
    if (err) return res.status(500).json({ msg: 'failed to update character' });
    res.status(200).json(data);
  });
});

// delete single character
characterRouter.delete('/character/:id', (req, res) => {
  Character.remove({_id: req.params.id}, (err) => {
    if (err) return res.status(500).json({ msg: 'failed to delete character' });
    res.status(200).json({
      msg: 'character has been deleted'
    });
  });
});
