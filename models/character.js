const mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  characterName: {
    type: String,
    required: true,
    default: 'Jack'
  },
  level: {
    type: Number,
    required: true,
    default: 1
  },
  class: {
    type: String,
    required: true,
    default: 'fighter'
  },
  playerId: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true,
    default: 'human'
  },
  alignment: {
    type: String,
    required: true,
    default: 'neutral good'
  },
  xp: {
    type: Number,
    required: true,
    default: 0
  },
  abilities: {
    strength: {
      type: Number,
      required: true,
      default: 10
    },
    dexterity: {
      type: Number,
      required: true,
      default: 10
    },
    constitution: {
      type: Number,
      required: true,
      default: 10
    },
    intelligence: {
      type: Number,
      required: true,
      default: 10
    },
    wisdom: {
      type: Number,
      required: true,
      default: 10
    },
    charisma: {
      type: Number,
      required: true,
      default: 10
    }
  },
  hitPoints: {
    max: {
      type: Number,
      required: true,
      default: 10
    },
    temporary: Number,
    dice: {
      type: String,
      required: true,
      default: 'd8'
    }
  },
  speed: {
    type: Number,
    required: true,
    default: 30
  },
  initiative: {
    type: Number,
    required: true,
    default: 0
  },
  deathSave: {
    failure: {
      type: Number,
      min: 0,
      max: 3,
      default: 0
    },
    success: {
      type: Number,
      min: 0,
      max: 3,
      default: 0
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

module.exports = exports = mongoose.model('Character', characterSchema);
