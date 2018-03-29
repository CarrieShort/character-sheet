import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Abilities from './components/abilities';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Abilities}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
