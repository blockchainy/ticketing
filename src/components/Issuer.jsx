import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import contract from 'truffle-contract';

import DatePicker from './DatePicker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import TextField from 'material-ui/TextField';
import TicketSale from '../build/contracts/TicketSale.json';

import 'semantic-ui-css/semantic.min.css';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var MyContract = contract(TicketSale);

// set default data for the contract
MyContract.defaults({
    from: '0xc829401bcce37d3f4f6d02846ae1c44fb5b7ae71',
    gas: 4712388,
    gasPrice: 1000000000
})

MyContract.setProvider(provider);

var MyContract;
var provider;

// const initialState = {
//     contractAddress: '',
//     ownerAddress: '',
//     supply: 0,
//     name: '',
//     price: 0,
//     time: '',
//     currentAddress: '',
//     priceOfEther: 0
// };

class Issuer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractAddress: '',
            ownerAddress: '',
            supply: 0,
            name: '',
            price: 0,
            time: '',
            afterMarket: '',
            currentAddress: '',
            priceOfEther: 0
        };
        this.deployContract = this.deployContract.bind(this);
        this.fromUsdToWei = this.fromUsdToWei.bind(this);
        this.setDateTime = this.setDateTime.bind(this);
        // this.initWeb3 = this.initWeb3.bind(this);
    }

    //=====BUG======
    // if user submits multiple tickets price multiplies every time
    fromUsdToWei(price) {
        var priceInEther = price / this.state.priceOfEther;
        var priceInWei = priceInEther * 1000000000000000000;
        return priceInWei;
    }

    setDateTime(dateTime) {
        var myDate = new Date(dateTime);
        console.log(`My Date: ${myDate}`);
        var time = myDate.getTime() / 1000.0;

        this.setState({ time });
        console.log(time);
    }

    // initWeb3() {
    //     if (typeof window.web3 !== 'undefined') {
    //         window.web3 = new Web3(window.web3.currentProvider);
    //         console.log(`Web 3 version is: ${window.web3.version.network}`);
    //         provider  = window.web3.currentProvider;
    //         console.log(`Provider is: ${provider}`);

    //     } else {
    //         console.log('No web3? You should consider trying MetaMask!')
    //         window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //         console.log(`Connected to localhost:8545 or testrpc`);
    //         provider  = new Web3.providers.HttpProvider("http://localhost:8545");
    //         console.log(`Provider is: ${provider}`);
    //     }

    //     MyContract = contract(TicketSale);
    //     MyContract.setProvider(window.web3);        
    //     const account = window.web3.eth.accounts;

    //     MyContract.defaults({
    //         from: account,
    //         gas: 4712388,
    //         gasPrice: 1000000000
    //     })
    // }

    deployContract() {
        let contractInstance;
        MyContract.new()
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getContractAddress();
            })
            .then(contractAddress => {
                console.log(`Contract address: ${contractAddress}`);
                this.setState({ contractAddress })
                return contractInstance.getOwner();
            })
            .then(creator => {
                console.log(`Creator: ${creator}`)
                this.setState({ ownerAddress: creator })
                return contractInstance.getSupply();
            })
            .then(supply => {
                console.log(`Old Supply: ${supply}`)
                // set all the data and push it to the contract
                contractInstance.setSupply(this.state.supply)
                contractInstance.setName(this.state.name)
                contractInstance.setPrice(this.fromUsdToWei(this.state.price))
                contractInstance.setTime(this.state.time)
                contractInstance.setAfterMarket(this.state.afterMarket)
                // store in wei for db
                const price = this.fromUsdToWei(this.state.price);
                this.setState({ price })
                return contractInstance.getSupply();
            })
            .then(newSupply => {
                console.log(`New Supply: ${newSupply}`)
                return contractInstance.getName();
            })
            .then(name => {
                console.log(`Name: ${name}`)
                return contractInstance.getPrice();
            })
            .then(price => {
                console.log(`Price: ${price}`);
                axios.post('http://localhost:1337/updateDB', {
                    // passing your url to your express server
                    address: this.state.contractAddress,
                    name: this.state.name,
                    price: this.state.price,
                    supply: this.state.supply,
                    time: this.state.time,
                    afterMarket: this.state.afterMarket
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(`${error}`);
            })
    }

    componentWillMount() {
        // this.initWeb3();
        axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/')
            .then(response => {
                this.setState({ priceOfEther: response.data[0].price_usd });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ marginLeft: 20 }}>
                <MuiThemeProvider>
                    <TextField
                        hintText="Enter Ticket Name"
                        onChange={event => this.setState({ name: event.target.value })}
                    />
                    <br />
                    <TextField
                        hintText="Set Price (in USD)"
                        onChange={event => this.setState({ price: event.target.value })}
                    />
                    <br />
                    <TextField
                        hintText="Enter Supply of Tickets"
                        onChange={event => this.setState({ supply: event.target.value })}
                    />
                    <br />
                    <DatePicker updateDate={this.setDateTime} />
                    <br />
                    Allow resale on tickets?
                    <RadioButtonGroup
                        onChange={(evemt, value) => { this.setState({ afterMarket: value }) }}
                    >
                        <RadioButton
                            label="Yes"
                            value='true'
                        />
                        <RadioButton
                            label="No"
                            value='false'
                        />
                    </RadioButtonGroup>
                    <br/>
                    <RaisedButton label="Deploy Contract" onClick={this.deployContract} />
                </MuiThemeProvider>
                <p></p>

                <div>Contract Address: {this.state.contractAddress}</div>
                <p></p>
                <div>Owner Address: {this.state.ownerAddress}</div>
            </div>
        )
    }
}

export default Issuer;

