import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import 'semantic-ui-css/semantic.min.css';

import TicketSale from '../build/contracts/TicketSale.json';

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');

var web3 = new Web3(web3Provider);

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var TicketSaleContract = contract(TicketSale);

TicketSaleContract.defaults({
    from: '0x06ab63440bac2adb3ffbe072edd5dfd3e91a3759',
    gas: 4712388,
    gasPrice: 100000000000
})

TicketSaleContract.setProvider(provider);

class MyTickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            walletAddress: '0x06ab63440bac2adb3ffbe072edd5dfd3e91a3759',
            address: '',
            numberOfTickets: 0
        };
        this.checkTicketAmount = this.checkTicketAmount.bind(this);
    }

    checkTicketAmount() {
        let contractInstance;
        TicketSaleContract.at(`${this.state.address}`)
            .then(instance => {
                contractInstance = instance;
                // =======TODO======
                // should be dynamic and grab address
                return contractInstance.numberOfTicketFromAddress(this.state.walletAddress);
            })
            .then(numberOfTickets => {
                console.log(`Number of tickets: ${numberOfTickets}`)
                this.setState({ numberOfTickets })       
            })
            .catch(error => {
                console.log(`${error}`);
            })
    }

    render() {
        return (
            <div style={{ marginLeft: 20 }}>
                <p></p>
                <div>
                Check what tickets I currently have
                <br />
                <MuiThemeProvider>
                    <TextField
                        hintText="Enter ticket contract address"
                        onChange={event => this.setState({ address: `${event.target.value}` })}
                    />

                </MuiThemeProvider>
                </div>
                <button class="ui animated button" tabindex="0" onClick={this.checkTicketAmount}>
                    <div class="visible content">Check number of tickets</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <br/>
                <p></p>
                Number of tickets at {this.state.walletAddress} :
                <br/>
                {this.state.numberOfTickets}
            </div>
        )
    }
}

export default MyTickets;
