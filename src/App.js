import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
        <Route exact path="/" component={Home}/>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
