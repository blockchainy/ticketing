import React, { Component } from 'react';
import Web3 from 'web3';

import fs from 'fs';
import solc from 'solc';

import 'semantic-ui-css/semantic.min.css';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const source  = fs.readFileSync('Test.sol', 'utf8');
const compiledContract = solc.compile(source, 1);
const abi = compiledContract.contracts['Test'].interface;
const bytecode = compiledContract.contracts['Test'].bytecode;
const gasEstimate = web3.eth.gasEstimate({ data: bytecode });
const MyContract = web3.eth.contract(JSON.parse(abi));


var abi = [{"constant":true,"inputs":[],"name":"getAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fallBackCalled","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
var MyContract = web3.eth.contract(abi);
var contractInstance = MyContract.new({from: web3.eth.accounts[2], gas: 1000000});

// var contractInstance = myContract.at('0x8f265680527a9a417e2914bb469ff0cd0428f880');

web3.eth.defaultAccount = web3.eth.accounts[1];

class PleaseWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            etherInWallet: 0,
            amount: 0,
            amountOfTickets: 0
        };
    

    }

    componentWillMount() {
        var owner = contractInstance.getOwner();
        this.setState({ owner });
    }

    render() {
        return (
            <div>
                <div>
                       Owner is: {this.state.owner}
                </div>
            </div>
        )
    }
}

export default PleaseWork;