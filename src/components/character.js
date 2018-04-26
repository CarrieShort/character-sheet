import React, { Component } from 'react';
import axios from 'axios';

class Character extends Component {
  state = {
    isError: false,
    isEditing: false,
    errorMessage: ''
  }
  render () {
    return (
      <section>
      {this.state.isError ? (<p>{this.state.errorMessage}</p>) : ''}
      <h2>Character Name</h2>
        
      </section>
    )
  }
}

export default Character;
