import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'semantic-ui-css/semantic.min.css';

import AfterMarket from './AfterMarket';
import TicketSale from '../build/contracts/TicketSale.json'

import '../App.css';

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');

var web3 = new Web3(web3Provider);

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var TicketSaleContract = contract(TicketSale);

TicketSaleContract.defaults({
    from: '0x541995f53f0102a39e055856c68f599a20838ac7',
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
            price: 0
        };
        this.buyTicket = this.buyTicket.bind(this);
        // this.initWeb3 = this.initWeb3.bind(this);
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
                return contractInstance.numberOfTicketFromAddress('0x541995f53f0102a39e055856c68f599a20838ac7')
            })
            .then(numOfTix => {
                console.log(`Number of tickets before purchase: ${numOfTix}`);
                contractInstance.buyMultipleTickets(2, { value: 507087936329796580 })
                return contractInstance.numberOfTicketFromAddress('0x541995f53f0102a39e055856c68f599a20838ac7')
            })
            .then(afterTix => {
                console.log(`Number of tickets after purhcase: ${afterTix}`);
                return contractInstance.numberOfTicketFromAddress('0x541995f53f0102a39e055856c68f599a20838ac7')
            })
            .then(numberOfTickets => {
                console.log(`You (0x541995f53f0102a39e055856c68f599a20838ac7) now have ${numberOfTickets}`);
            })
            .catch(error => console.log(error))

    }

    print() {
        console.log(`address`);
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

    // error somewhere here
    componentWillMount() {

        axios.get('http://localhost:1337/getInfo', {
            params: {
                address: this.state.contractAddress
            }
        })
            .then(response => {
                this.setState({
                    name: response.data[0].ticketName,
                    supply: response.data[0].supply,
                    price: response.data[0].price
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div style={{ marginLeft: 20 }}>
                Name: {this.state.name}
                <br />
                Total Supply: {this.state.supply}
                <br />
                Price: {this.state.price}

                <br />
                <button class="ui animated button" tabindex="0" onClick={this.buyTicket}>
                    <div class="visible content">Buy Ticket From Issuer</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <br />
                <h2>After Market</h2>
                <AfterMarket address={this.state.contractAddress}/>
            </div>
        )
    }
}

export default TicketInformation;



