import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

// ======RUN ISSUER FOR FULL CONTEXT========
// import Issuer from './Issuer';


// import ContractTable from './ContractTable';
// import TableTest from './TablesClass';
// ======RUN CONTRACTTABLEWITHWEB3 FOR FULL BUYER PERSPECTIVE=======
import ContractTableWithWeb3 from './ContractTableWithWeb3';

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
          {/* <Issuer/> */}
          {/* <ContractTable/> */}
          {/* <TableTest/> */}
          <ContractTableWithWeb3/>
        </div>
      </div>
    );
  }
}

export default App;
