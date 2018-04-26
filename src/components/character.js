import React, { Component } from 'react';
import axios from 'axios';

class Character extends Component {
  state = {
    data: '',
    loading: true,
    isError: false,
    isEditing: false,
    errorMessage: ''
  }
  componentDidMount () {
   axios.get('/api/character/' + this.props.match.params.id)
     .then(response => {
       this.setState({
         data: response.data,
         isError: false,
       });
     })
     .catch(error => {
       console.log(error.response.data.msg);
       this.setState({
         isError: true,
         errorMessage: error.response.data.msg
       })
     });
   }
  render () {
    var data = this.state.data;
    return (
      <section>
      {this.state.isError ? (<p>{this.state.errorMessage}</p>) : ''}
      <h2>{data.characterName}</h2>
        {data.characterName}
      </section>
    )
  }
}

export default Character;
