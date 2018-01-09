import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'semantic-ui-css/semantic.min.css';
import RaisedButton from 'material-ui/RaisedButton';

import AfterMarket from './AfterMarket';
import TicketSale from '../build/contracts/TicketSale.json'

import '../App.css';
import 'typeface-roboto'

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');

var web3 = new Web3(web3Provider);

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var TicketSaleContract = contract(TicketSale);

TicketSaleContract.defaults({
    from: '0xc6d2446101eee43e362401ef720d9305693c3d81',
    gas: 4712388,
    gasPrice: 100000000000
})

TicketSaleContract.setProvider(provider);

class TicketInformation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contractAddress: this.props.match.params.ticketId,
            name: '',
            supply: 0,
            price: 0,
            time: '',
            afterMarket: ''
        };
        this.buyTicket = this.buyTicket.bind(this);
        // this.initWeb3 = this.initWeb3.bind(this);
        this.convertToHumanTime = this.convertToHumanTime.bind(this);
    }

    buyTicket() {
        const address = this.state.contractAddress;
        let contractInstance;
        // pass address as props into contract
        TicketSaleContract.at(address)
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getName();
            })
            .then(name => {
                console.log(`Name of ticket trying to purchase: ${name}`);
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(numOfTix => {
                console.log(`Number of tickets before purchase: ${numOfTix}`);
                contractInstance.buyMultipleTickets(2, { value: 507087936329796580 })
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(afterTix => {
                console.log(`Number of tickets after purhcase: ${afterTix}`);
                return contractInstance.numberOfTicketFromAddress('0xc6d2446101eee43e362401ef720d9305693c3d81')
            })
            .then(numberOfTickets => {
                console.log(`You (0xc6d2446101eee43e362401ef720d9305693c3d81) now have ${numberOfTickets}`);
            })
            .catch(error => console.log(error))

    }

    print() {
        console.log(`address`);
    }

    convertToHumanTime(time) {
        var myDate = new Date(time * 1000);
        var date = myDate.toLocaleString();
        return date;
    }

    // initWeb3() {
    //     if (typeof web3 !== 'undefined') {
    //         window.web3 = new Web3(web3.currentProvider);

    //         TicketSaleContract.setProvider(web3.currentProvider);
    //         TicketSaleContract.defaults({
    //             from: '0x32e38683aba1fe7a975cf3cddb44d285ffc2245a',
    //             gas: 4712388,
    //             gasPrice: 100000000000
    //         })

    //     } else {
    //         console.log('No web3? You should consider trying MetaMask!')
    //         // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //         window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //     }
    // }

    async componentWillMount() {
        let response = await axios.get('http://localhost:1337/getInfo', {
            params: {
                address: this.state.contractAddress
            }
        })
        var newDate = this.convertToHumanTime(response.data[0].time);        

        this.setState({
            name: response.data[0].ticketName,
            supply: response.data[0].supply,
            price: response.data[0].price,
            time: newDate,
            afterMarket: response.data[0].afterMarket
        })
    }


    render() {
        return (
            <div style={{ marginLeft: 20 }}>
            <p></p>
            <h1>
                Ticket Details
            </h1>
                Name: {this.state.name}
                <br />
                Total Supply: {this.state.supply}
                <br />
                Price: {this.state.price}
                <br />
                Date of Event: {this.state.time}
                <p></p>
                <RaisedButton label="Buy ticket from issuer" onClick={this.buyTicket}/>
                <br />
                <h2>After Market</h2>
                <AfterMarket address={this.state.contractAddress} afterMarketStatus={this.state.afterMarket}/>
                Address: {this.state.contractAddress}
                <br />
                Aftermakret: {this.state.afterMarket}
            </div>
        )
    }
}

export default TicketInformation;



