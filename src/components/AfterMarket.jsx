import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import contract from 'truffle-contract';

import TicketSale from '../build/contracts/TicketSale.json';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import 'semantic-ui-css/semantic.min.css';

import Tables from './SellTable';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var TicketSaleContract = contract(TicketSale);

// set default data for the contract
TicketSaleContract.defaults({
    from: '0x541995f53f0102a39e055856c68f599a20838ac7',
    gas: 4712388,
    gasPrice: 1000000000
})

TicketSaleContract.setProvider(provider);

class SellTicket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sellers: [],
            address: props.address
        };
        this.sellTicket = this.sellTicket.bind(this);
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
                return contractInstance.numberOfTicketFromAddress('0x541995f53f0102a39e055856c68f599a20838ac7')
            })
            .then(beforeTix => {
                console.log(`Number of tickets before listing ${beforeTix}`);
                contractInstance.sellTicket()
                return contractInstance.numberOfTicketFromAddress('0x541995f53f0102a39e055856c68f599a20838ac7')
            })
            .then(afterTix => {
                console.log(`Number of tickets after listing on for sale: ${afterTix}`);
                return contractInstance.ticketsAtForSale('0x541995f53f0102a39e055856c68f599a20838ac7')
            })
            .then(atForSale => {
                console.log(`Number of tickets at forSale mapping sale: ${atForSale}`);
                return contractInstance.getSellers()
            })
            .then(sellers => {
                console.log(`These are the sellers: ${sellers}`);
                this.setState({ sellers })
            })
            .catch(error => console.log(error))
    }

    // async await version of sell ticket
    // async sellTicket() {
    //     const instance = await TicketSaleContract.at('0x854d08ab30b73046331b352986f12b8f17a9905a')
    //     const name = await instance.getName() 
    //     console.log(`Name of ticket trying to sell: ${name}`); 
    //     const beforeTix = await instance.numberOfTicketFromAddress('0x8e2ac2177ffafaf3c77df55a13e3a5eb94163ee8')
    //     console.log(`Number of tickets before listing ${beforeTix}`);
    //     instance.sellTicket()
    //     const afterTix = await instance.numberOfTicketFromAddress('0x8e2ac2177ffafaf3c77df55a13e3a5eb94163ee8')
    //     console.log(`Number of tickets after listing on for sale: ${afterTix}`)
    //     const atForSale = await instance.ticketsAtForSale('0x8e2ac2177ffafaf3c77df55a13e3a5eb94163ee8')
    //     console.log(`Number of tickets at forSale mapping sale: ${atForSale}`);
    //     const sellers = await instance.getSellers()
    //     console.log(`These are the sellers: ${sellers}`)

    // }

    componentWillMount() {
        let contractInstance;
        TicketSaleContract.at(this.state.address)
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getSellers();
            })
            .then(sellers => {
                console.log(`These are the sellers: ${sellers}`);
                // this.setState({ sellers })
                console.log(`These are teh sellers FROM STATE: ${this.state.sellers}`);
                console.log(`This is the conrtact address: ${this.state.address}`);
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <p></p>
                <button class="ui animated button" tabindex="0" onClick={this.sellTicket}>
                    <div class="visible content">Sell Ticket</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <br />
                <MuiThemeProvider>
                    <Tables
                        data={this.state.sellers}
                        header={[
                            {
                                name: "Seller Address",
                                prop: "sellerAddress",
                            },
                            {
                                name: "Price",
                                prop: "price"
                            }
                        ]}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default SellTicket;