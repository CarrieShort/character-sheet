import React, { Component } from 'react';

class Abilities extends Component {
  state = {
    abilities: {
      strength: '',
      dexterity: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
  }

  render () {
    return (
      <section>
      <h2>Abilities</h2>
        <form className="form abilities" onSubmit={this.handleSubmit}>
          <input type="text" name="strenght" />
          <input type="text" name="dexterity" />
          <input type="text" name="constitution" />
          <input type="text" name="intelligence" />
          <input type="text" name="wisdom" />
          <input type="text" name="charisma" />
          <button type="submit">Save</button>
        </form>
      </section>
    )
  }
}

export default Abilities;
