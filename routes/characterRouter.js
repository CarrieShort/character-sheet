const Router = require('express').Router;
const Character = require(__dirname + '/../models/character');
const bodyParser = require('body-parser').json();
const characterRouter = module.exports = exports = new Router();

var missingField = function (req, res, fieldName, message) {
  if (!req.body[fieldName]) return res.status(500).json({ msg: 'missing: ' + message});
}

characterRouter.post('/create', bodyParser, (req, res) => {
  missingField(req, res, 'characterName', 'character name');
  missingField(req, res, 'level', 'character name');
  missingField(req, res, 'class', 'character name');
  missingField(req, res, 'playerId', 'character name');
  missingField(req, res, 'race', 'character name');
  missingField(req, res, 'alignment', 'character name');
  missingField(req, res, 'xp', 'character name');
  missingField(req, res, 'xp', 'character name');
  return res.status(200).json({status: 'Creation Successful!'});
});
