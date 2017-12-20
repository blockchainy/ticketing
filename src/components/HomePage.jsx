import React from 'react';
import { Route, Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import logo from '../logo.svg';
import '../App.css';

import Issuer from './Issuer';
import ContractTable from './ContractTableWithWeb3';
import TicketInfo from './TicketInformation';
import AfterMarket from './AfterMarket';

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
                <Link to="/sell">
                    <RaisedButton label="Sell Tickets" />
                </Link>
                <Route path="/sell" component={AfterMarket} />
                <Route path="/issue" component={Issuer} />
                <Route path="/buy" component={ContractTable} />
                <Route exact={true} path="/ticketinfo" component={TicketInfo} />
                <Route path="/ticketinfo/:ticketId" component={TicketInfo} />
            </MuiThemeProvider>
        </div>
    </div>
)

export default HomePage;