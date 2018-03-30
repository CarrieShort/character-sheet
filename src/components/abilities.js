import React, { Component } from 'react';
import axios from 'axios';

class Abilities extends Component {
  state = {
    isError: false,
    errorMessage: '',
    abilities: {
      strength: '',
      dexterity: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: ''
    }
  }
  onInputChange = e => {
    var inputName = e.target.name
    this.setState({
      abilities: {...this.state.abilities, [inputName]: Number(e.target.value)}
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      abilities: this.state.abilities,
    }
    console.log(e)
    axios.post('/api/create', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error.response.data.msg);
    this.setState({
      isError: true,
      errorMessage: error.response.data.msg
    })
  }.bind(this));
  }

  render () {
    return (
      <section>
      {this.state.isError ? (<p>{this.state.errorMessage}</p>) : ''}
      <h2>Abilities</h2>
        <form className="form abilities" onSubmit={this.handleSubmit}>
          <input type="text" name="strength" onChange={this.onInputChange} value={this.state.abilities.strength} />
          <input type="text" name="dexterity" onChange={this.onInputChange} value={this.state.abilities.dexterity}/>
          <input type="text" name="constitution" onChange={this.onInputChange} value={this.state.abilities.constitution}/>
          <input type="text" name="intelligence" onChange={this.onInputChange} value={this.state.abilities.intelligence}/>
          <input type="text" name="wisdom" onChange={this.onInputChange} value={this.state.abilities.wisdom}/>
          <input type="text" name="charisma" onChange={this.onInputChange} value={this.state.abilities.charisma}/>
          <button type="submit">Save</button>
        </form>
      </section>
    )
  }
}

export default Abilities;
