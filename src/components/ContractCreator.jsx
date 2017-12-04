import React, { Component } from 'react';
import fs from 'fs';
import solc from 'solc';
import Web3 from 'web3';

import 'semantic-ui-css/semantic.min.css';
// ====BELOW IS USED FOR WEB3 BETA=========
// The name: myContract.methods.myMethod(123)
// The name with parameters: myContract.methods['myMethod(uint256)'](123)
// myContract.options.address = contract address
/* 
  '0x98db3a55012bcd5dfc2c97b712d23a79b02ccbfd',
  '0x51a284ca16689a6b84c761e789be912e94387370',
  '0xf336fdea8c917ea90ca16bad058b1eb5a6f0b5aa',
  '0x4f079980d2c8864e3733816c567e3c5f7131866a',
  '0xc20c1cb935cd3ce93c0daff454a01e7be0bc2c64',
  '0x42d2b2db0057545bcda04f5ad341902060160da0',
  '0x171dbc499e66404d3bbd488acb5346ac201fa772',
  '0x9d25b042ee2455d71403c7dbf6dadf7710570e2f',
  '0x6a8bc146bc18ccbf083a2b383652b0933b226e10',
  '0x75aa30b4f525d94c3a27c4330905717e2c0c3271' 
*/

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const input = fs.readFileSync('Test.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts['Test'].bytecode;
const abi = JSON.parse(output.contracts['Test'].interface);

const contract = web3.eth.contract(abi);

const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas: 90000 * 2
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(res.transactionHash);
    if (res.address) {
        console.log(`Contract address: ${res.address}`);
        testContract(res.address);
    }
});

function testContract(address) {
    // Reference to the deployed contract
    const token = contract.at(address);
    // Destination account for test
    const dest_account = '0x002D61B362ead60A632c0e6B43fCff4A7a259285';

    // Assert initial account balance, should be 100000
    const balance1 = token.balances.call(web3.eth.coinbase);
    console.log(balance1 == 1000000);

    // Call the transfer function
    token.transfer(dest_account, 100, {from: web3.eth.coinbase}, (err, res) => {
        // Log transaction, in case you want to explore
        console.log('tx: ' + res);
        // Assert destination account balance, should be 100 
        const balance2 = token.balances.call(dest_account);
        console.log(balance2 == 100);
    });
}


web3.eth.defaultAccount = web3.eth.accounts[1];

class ContractCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };

        this.getTime = this.getTime.bind(this);
        this.getOwner = this.getOwner.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    getTime() {
        var time = contractInstance.getTime()
        console.log(time);
    }

    getOwner() {
        var owner = contractInstance.getOwner();
        console.log(owner);
    }

    getAddress() {
        var address = contractInstance.getAddress()
        console.log(address);
    }

    componentWillMount() {
        // var address = myContract.methods.getAddress()
        // this.setState({ address });
    }

    render() {
        return (
            <div>
                <button class="ui animated button" tabindex="0" onClick={this.getTime}>
                    <div class="visible content">Get Time</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.getOwner}>
                    <div class="visible content"> Get Owner Address</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <button class="ui animated button" tabindex="0" onClick={this.getAddress}>
                    <div class="visible content">Get my address</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
            </div>
        )
    }
}

export default ContractCreation;