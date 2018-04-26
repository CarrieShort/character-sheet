import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Character from './components/character';
import Abilities from './components/abilities';
import NotFound from './components/notfound';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
      <Switch>
        <Route path="/character/:id" component={Character}/>
        <Route exact path="/" component={Abilities}/>
        <Route component={NotFound}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
