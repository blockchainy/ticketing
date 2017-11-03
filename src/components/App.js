import React, { Component } from 'react';
import PriceBox from './PriceBox';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Price Calculator</h1>
        </header>
        <p></p>
        <div>
          <PriceBox />
        </div>
      </div>
    );
  }
}

export default App;
