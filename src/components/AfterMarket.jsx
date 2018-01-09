import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import contract from 'truffle-contract';

import TicketSale from '../build/contracts/TicketSale.json';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import 'semantic-ui-css/semantic.min.css';

import Tables from './SellTable';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var TicketSaleContract = contract(TicketSale);

// set default data for the contract
TicketSaleContract.defaults({
    from: '0xc6d2446101eee43e362401ef720d9305693c3d81',
    gas: 4712388,
    gasPrice: 1000000000
})

TicketSaleContract.setProvider(provider);

class AfterMarket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sellers: [],
            address: props.address,
            afterMarket: props.afterMarketStatus
        };
        this.sellTicket = this.sellTicket.bind(this);
        this.buyTicket = this.buyTicket.bind(this);
        this.afterMarketStatus = this.afterMarketStatus.bind(this);
    }


    // =====TODO=====
    // REMOVE FROM ARRAY WHEN SOLD OUT
    sellTicket() {
        let contractInstance;
        TicketSaleContract.at(this.state.address)
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getName();
            })
            .then(name => {
                console.log(`Name of ticket trying to sell: ${name}`);
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(beforeTix => {
                console.log(`Number of tickets before listing ${beforeTix}`);
                contractInstance.sellTicket()
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(afterTix => {
                console.log(`Number of tickets after listing on for sale: ${afterTix}`);
                return contractInstance.ticketsAtForSale('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(atForSale => {
                console.log(`Number of tickets at forSale mapping sale: ${atForSale}`);
                return contractInstance.getSellers()
            })
            .then(sellers => {
                console.log(`These are the sellers: ${sellers}`);

                // this is meant to remove all sold out tickets from seller index 
                // solidity can't properly remove an index at array so you use this instead
                // also used below in componentWillMount
                function isEmpty(value, index, array) {
                    if (value == '0x0000000000000000000000000000000000000000') {
                        return false;
                    } else {
                        return true;
                    }
                }
                var newSellers = sellers.filter(isEmpty);
                this.setState({ sellers: newSellers })
            })
            .catch(error => console.log(error))
    }

    //======TODO======
    // BUY TICKET FROM OTHER PERSON
    buyTicket(address) {
        let contractInstance;
        TicketSaleContract.at(this.state.address)
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getName();
            })
            .then(name => {
                console.log(`Name of ticket trying to buy: ${name}`);
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(beforeTix => {
                console.log(`Number of tickets before buying ${beforeTix}`);
                contractInstance.buyTicketFromSeller(address, { value: 507087936329796580 })
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(afterTix => {
                console.log(`Number of tickets after buying ${afterTix}`);
            })
            .catch(error => console.log(error))
    }

    afterMarketStatus() {
        if (this.state.afterMarketStatus == "false") {
            return true;
        } else if (this.state.afterMarketStatus == "true") {
            return false;
        } else {
            console.log(`awdf`);
        }
    }

    // ====NOTE TO SELF=====
    // figure out why this is needed to get props when address wasn't
    componentWillReceiveProps(nextProps) {
        console.log(`componentWIllRecieveProps called: ${nextProps.afterMarketStatus}`);
        this.setState({ afterMarket: nextProps.afterMarketStatus });
    }


    componentWillMount() {
        let contractInstance;
        TicketSaleContract.at(this.state.address)
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getSellers();
            })
            .then(sellers => {

                function isEmpty(value, index, array) {
                    if (value == '0x0000000000000000000000000000000000000000') {
                        return false;
                    } else {
                        return true;
                    }
                }

                var newSellers = sellers.filter(isEmpty);

                console.log(`These are the sellers: ${sellers}`);
                this.setState({ sellers: newSellers })
                console.log(`These are the sellers FROM STATE: ${this.state.sellers}`);
                console.log(`This is the contract address: ${this.state.address}`);
            })
            .catch(error => console.log(error))

        console.log(`Address: ${this.props.address}`);
        console.log(`After market status from status: ${this.props.afterMarketStatus}`);
        console.log(Object.keys(this.props));



        // var afterMarketStatus = this.afterMarketStatus();
        // console.log(`After market status: ${afterMarketStatus}`);
        // this.setState({ afterMarket: afterMarketStatus })

    }

    render() {
        return (
            <div>
                <p></p>
                <RaisedButton label="Sell ticket on aftermarket" onClick={this.sellTicket} disabled={this.state.afterMarket} />
                <br />
                <MuiThemeProvider>
                    <Tables
                        sellers={this.state.sellers}
                        buyTicket={this.buyTicket}
                        header={[
                            {
                                name: "Seller Address",
                                prop: "sellerAddress",
                            }
                        ]}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default AfterMarket;

