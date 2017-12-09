import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import contract from 'truffle-contract';

// import Table from './Tables';
import TableTest from './Tables';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TicketSale from '../build/contracts/TicketSale.json';


const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');


var web3 = new Web3(web3Provider);

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var TicketSaleContract = contract(TicketSale);

TicketSaleContract.defaults({
    from: '0x417198095d8b3c0f382ede3cf1e28fd8b74f4f11',
    gas: 4712388,
    gasPrice: 100000000000
})

TicketSaleContract.setProvider(provider);


class ContractTableWithWeb3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractAddress: [],
            ticketName: [],
            data: []
        };

        this.postInfo = this.postInfo.bind(this);
        this.buyTicket = this.buyTicket.bind(this);
    }

    buyTicket(i) {
        let contractInstance;
        // pass address as props into contract
        TicketSaleContract.at(this.state.contractAddress[i])
            .then(instance => {
                contractInstance = instance;
                return contractInstance.getName();
            })
            .then(name => {
                console.log(`Name of ticket trying to purchase: ${name}`);
                return contractInstance.numberOfTicketFromAddress('0x417198095d8b3c0f382ede3cf1e28fd8b74f4f11')
            })
            .then(numOfTix => {
                console.log(`Number of tickets before purchase: ${numOfTix}`);
                contractInstance.buyMultipleTickets(2, { value: 507087936329796580 })
                return contractInstance.numberOfTicketFromAddress('0x417198095d8b3c0f382ede3cf1e28fd8b74f4f11')
            })
            .then(afterTix => {
                console.log(`Number of tickets after purhcase: ${afterTix}`);
                return contractInstance.numberOfTicketFromAddress('0x417198095d8b3c0f382ede3cf1e28fd8b74f4f11')
            })
            .then(numberOfTickets => {
                console.log(`You (0x417198095d8b3c0f382ede3cf1e28fd8b74f4f11) now have ${numberOfTickets}`);
            })
            .catch(error => console.log(error))

    }

    postInfo() {
        axios.get('http://localhost:1337/selectAll')
            .then(response => {
                const contractAddress = this.state.contractAddress.slice()
                const ticketName = this.state.ticketName.slice()

                for (var i = 0; i < response.data.length; i++) {
                    contractAddress.push(response.data[i].contractAddress)
                    ticketName.push(response.data[i].ticketName)
                }

                this.setState({
                    contractAddress,
                    ticketName,
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentWillMount() {
        this.postInfo();
    }

    render() {
        <p></p>
        return (
            <div>
                <p></p>
                <MuiThemeProvider>
                    <TableTest
                        buyTicket={this.buyTicket}
                        data={this.state.data}
                        header={[
                            {
                                name: "Contract Address",
                                prop: "contractAddress",
                                data: this.state.contractAddress
                            },
                            {
                                name: "Ticket Name",
                                prop: "ticketName"
                            },
                            {
                                name: "Price",
                                prop: "price"
                            },
                            {
                                name: "Supply",
                                prop: "supply"
                            }
                        ]}
                    />
                </MuiThemeProvider>
                <p></p>
            </div>
        );
    }
}

export default ContractTableWithWeb3;