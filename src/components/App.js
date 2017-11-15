import React, { Component } from 'react';
import PriceBox from './PriceBox';
import TimeSelector from './TimeSelector';
import Issuer from './Issuer';

import Test from './Test';

import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Issue Tickets</h1>
        </header>
        <p></p>
        <div>
          {/* <PriceBox /> */}
          {/* <TimeSelector/> */}
          {/* <Issuer/> */}
          <Test/>
        </div>
      </div>
    );
  }
}

export default App;
