import React from 'react';
import { Route, Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from '../logo.svg';
import '../App.css';

import Issuer from './Issuer';
import ContractTable from './ContractTableWithWeb3';

const HomePage = () => (
    <div>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Home Page</h1>
            </header>
        </div>
        <div>
            <MuiThemeProvider>
                <Link to="/issue">
                    <RaisedButton label="Issue Tickets" />
                </Link>
                <Link to="/buy">
                    <RaisedButton label="Buy Tickets" />
                </Link>
                <Route path="/issue" component={Issuer} />
                <Route path="/buy" component={ContractTable} />
            </MuiThemeProvider>
        </div>
    </div>
)

export default HomePage;