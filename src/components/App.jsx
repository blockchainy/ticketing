import React, { Component } from 'react';
// import PriceBox from './PriceBox';
// import TimeSelector from './TimeSelector';
import Issuer from './Issuer';

// import PleaseWork from './web3test';


// import ContractCreator from './ContractCreator';


import Buyer from './Buyer';

// import Test from './Test';

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
          {/* <Test/> */}
          <Issuer/>
          {/* <ContractCreator/> */}
          {/* <PleaseWork/> */}
        </div>
      </div>
    );
  }
}

export default App;
