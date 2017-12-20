// following code lets you read/write to contract 
// upload ticket v1 
// moved to issuer.jsx

import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';

import TimeSelector from './TimeSelector';

import 'semantic-ui-css/semantic.min.css';


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var myContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_time","type":"uint256"}],"name":"setTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}])
var contractInstance = myContract.at('0x486351a2b3f3f63c04aeec19281cc7293cab8337');

web3.eth.defaultAccount = web3.eth.accounts[0];

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            price: 0,
            time: 0,
            priceOfEther: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.getUSD = this.getUSD.bind(this);
        this.getTicketInfo = this.getTicketInfo.bind(this);
        this.submitTicket = this.submitTicket.bind(this);
        this.checkBalance = this.checkBalance.bind(this);
        this.kill = this.kill.bind(this);
    }

    handleNumber(event) {
        this.setState({ amount: event.target.value });
    }

    handlePrice(event) {
        this.setState({ price: event.target.value });
    }

    handleSubmit() {
        console.log(`# of tix submitted is: ${this.state.amount}`);
        console.log(`Price per tix submitted is: ${this.state.price}`);
    }

    getUSD() {
        // enteredPrice/pulled ether price = how much ether
        // convert that amount of ether into wei
        var priceInEther = this.state.price / this.state.priceOfEther;
        var priceInWei = priceInEther * 1000000000000000000;
        this.setState({ price: priceInWei });
    }

    componentWillMount() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/')
            .then(response => {
                this.setState({ priceOfEther: response.data[0].price_usd });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    submitTicket() {
        contractInstance.setAmount(this.state.amount);
        contractInstance.setPrice(this.state.price);
        contractInstance.setTime(this.state.time);
    }

    getTicketInfo() {
        var amount = contractInstance.getAmount(this.state.amount);
        var price = contractInstance.getPrice(this.state.price);
        var time = contractInstance.getTime(this.state.time);
        console.log(`Amount: ${amount}`);
        console.log(`Price: ${price}`);
        console.log(`Time: ${time}`);
    }

    checkBalance() {
        var balance = contractInstance.checkBalance();
        console.log(balance);
    }

    kill() {
        contractInstance.kill();
        var balance = contractInstance.checkBalance();
        console.log(balance);
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
                <div>
                    Ticket Price in USD:
                    <input
                        onChange={event => this.setState({ price: event.target.value })}
                    />
                </div>
                <p></p>
                <TimeSelector/>
                <p></p>
                <button class="ui animated button" tabindex="0" onClick={this.handleSubmit}>
                    <div class="visible content">Print this shit</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.getUSD}>
                    <div class="visible content">Calculate in wei</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.submitTicket}>
                    <div class="visible content">Write to contract</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.getTicketInfo}>
                    <div class="visible content">Read from contract</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.kill}>
                    <div class="visible content">Kill Contract</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.checkBalance}>
                    <div class="visible content">Check Balance</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
            </div>
        )
    }
}

export default Test;