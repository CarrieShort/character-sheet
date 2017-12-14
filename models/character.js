const mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  characterName: {
    type: String,
    required: true
  },
  level: Number,
  class: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  alignment: {
    type: String,
    required: true
  },
  xp: Number,
  abilities: {
    strength: Number,
    dexterity: Number,
    constitution: Number,
    intelligence: Number,
    wisdom: Number,
    charisma: Number
  },
  hitPoints: {
    max: Number,
    temporary: Number,
    dice: String
  }
  speed: Number,
  initiative: Number,
  deathSave: {
    failure: {
      type: Number,
      min: 0,
      max: 3
    }
    success: {
      type: Number,
      min: 0,
      max: 3
    }
  },
  inspiration: String,
  proficiency: {
    bonus: Number,
    weapons: [String],
    skills: [String],
    tools: [String],
    savingThrows: [String],
  }
});

module.exports = exports = model.mongoose('Character', characterSchema);
