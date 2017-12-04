// BUYS FROM ISSUER

import React, { Component } from 'react';
import Web3 from 'web3';

import 'semantic-ui-css/semantic.min.css';


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = [{"constant":true,"inputs":[],"name":"returnWeiInWallet","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buySingleTicket","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"buyMultipleTickets","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_supply","type":"uint256"}],"name":"setSupply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"howMuchEtherAtAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"numberOfTicketFromAddress","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fallBackCalled","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"howMuchEtherInContract","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
var myContract = web3.eth.contract(abi);
var contractInstance = myContract.at('0x60757aa6096faa1b20c539c7ab4e1a56368cc2e6');

web3.eth.defaultAccount = web3.eth.accounts[1];

class Buyer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            etherInWallet: 0,
            amount: 0,
            amountOfTickets: 0
        };
        this.buySingleTicket = this.buySingleTicket.bind(this);
        this.buyTickets = this.buyTickets.bind(this);

    }

    buySingleTicket() {
        contractInstance.buySingleTicket({ value: 1000000000000000000 });
        this.setState({ amountOfTickets: contractInstance.numberOfTicketFromAddress(this.state.address) });

        var weiInWallet = contractInstance.returnWeiInWallet();
        var etherInWallet = weiInWallet / 1000000000000000000;
        this.setState({ etherInWallet });
    }

    buyTickets() {
        // should display price in wei
        var price = contractInstance.getPrice() * this.state.amount;
        var status = contractInstance.buyMultipleTickets(this.state.amount, {value: price});
        this.setState({ amountOfTickets: contractInstance.numberOfTicketFromAddress(this.state.address) });

        // update state of amount of ether in wallet 
        var weiInWallet = contractInstance.returnWeiInWallet();
        var etherInWallet = weiInWallet / 1000000000000000000;
        this.setState({ etherInWallet });

        // TODO =====RETURN ERROR CHECK BELOW========
        // var status = contractInstance.buyMultipleTickets();
        // if (status == true) {
        //     console.log(`${contractInstance.numberOfTicketFromAddress(this.state.address)} amount of tickets purchased!`);
        // } else {
        //     // should display error
        //     console.log('Please have enough ether to buy amount of tickets specified');
        // }
    }

    // get amount of ether in users wallet before anything
    componentWillMount() {
        // get wallet address
        var address = contractInstance.getAddress();
        // TODO: see if you can combine setState
        this.setState({ address });

        var weiInWallet = contractInstance.returnWeiInWallet();
        var etherInWallet = weiInWallet / 1000000000000000000;
        this.setState({ etherInWallet });

        var amountOfTickets = contractInstance.numberOfTicketFromAddress(address);
        this.setState({ amountOfTickets });
    }

    render() {
        return (
            <div>
                <div>
                    Number of Tickets:
                     <input
                        onChange={event => this.setState({ amount: event.target.value })}
                    />
                </div>
                <p></p>
                <button class="ui animated button" tabindex="0" onClick={this.buyTickets}>
                    <div class="visible content">Purchase ticket</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
            </div>
        )
    }
}

export default Buyer;