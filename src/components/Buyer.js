import React, { Component } from 'react';
import Web3 from 'web3';

import 'semantic-ui-css/semantic.min.css';


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var myContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "_amount", "type": "uint256" }], "name": "setAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_time", "type": "uint256" }], "name": "setTime", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTime", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_price", "type": "uint256" }], "name": "setPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "checkBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAmount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }])
var contractInstance = myContract.at('0x486351a2b3f3f63c04aeec19281cc7293cab8337');

web3.eth.defaultAccount = web3.eth.accounts[0];

class Buyer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            etherInWallet: 0
        };

        this.kill = this.kill.bind(this);

    }

    kill() {
        contractInstance.kill();
        var balance = contractInstance.checkBalance();
        console.log(balance);
    }

    render() {
        return (
            <div>
                <button class="ui animated button" tabindex="0" onClick={this.handleSubmit}>
                    <div class="visible content">Purchase single ticket</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
            </div>
        )
    }
}

export default Buyer;