import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import contract from 'truffle-contract';

import TicketSale from '../build/contracts/TicketSale.json';

import 'semantic-ui-css/semantic.min.css';


var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var MyContract = contract(TicketSale);

// set default data for the contract
MyContract.defaults({
    from: '0x8812460e9f6361dfac76e37b1da12b0967126480',
    gas: 4712388,
    gasPrice: 100000000000
})

MyContract.setProvider(provider);

class Issuer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractAddress: '',
            ownerAddress: '',
            supply: 0,
            name: '',
            price: 0,
            currentAddress: '',
            priceOfEther: 0
        };
        this.deployContract = this.deployContract.bind(this);
        this.fromUsdToWei = this.fromUsdToWei.bind(this);
    }

    fromUsdToWei(price) {
        var priceInEther = price / this.state.priceOfEther;
        var priceInWei = priceInEther * 1000000000000000000;
        return priceInWei;
    }

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
                contractInstance.setSupply(this.state.supply)
                contractInstance.setName(this.state.name)
                contractInstance.setPrice(this.fromUsdToWei(this.state.price))
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
            })
            .catch(error => {
                console.log(`${error}`);
            })
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

    render() {
        return (
            <div>
                <div>
                    Name: 
                     <input
                        onChange={event => this.setState({ name: event.target.value })}
                    />
                </div>
                <p></p>
                <div>
                    Set Price (in USD): 
                     <input
                        onChange={event => this.setState({ price: event.target.value })}
                    />
                </div>
                <p></p>
                <div>
                    Number of Tickets:
                     <input
                        onChange={event => this.setState({ supply: event.target.value })}
                    />
                </div>
                <p></p>
                <button class="ui animated button" tabindex="0" onClick={this.deployContract}>
                    <div class="visible content">Deploy Contract</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>



                <div>Contract Address: {this.state.contractAddress}</div>
                <p></p>
                <div>Owner Address: {this.state.ownerAddress}</div>
            </div>
        )
    }
}

export default Issuer;