const testCharacter = module.exports = exports = {
  good: {
    characterName: 'Arthock',
    level: 1,
    class: 'Ranger',
    playerId: '1abcd23',
    race: 'Dwarf',
    alignment: 'Chaotic Good',
    xp: 345,
    abilities: {
      strength: 12,
      dexterity: 14,
      constitution: 13,
      intelligence: 8,
      wisdom: 12,
      charisma: 10
    },
    hitPoints: {
      max: 22,
      dice: '1d8'
    },
    speed: 30,
    initiative: 16,
    deathSave: {
      failure: 0,
      success: 0
    },
    inspiration: 'none',
    proficiency: {
      bonus: 2,
      weapons: ['bow', 'axe'],
      skills: ['singing', 'throwing'],
      tools: ['blah', 'thing'],
      savingThrows: ['constitution', 'intelligence'],
    }
  },
  bad: {
    characterName: 'badArthock'
  }
}
