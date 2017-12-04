// following code successfully deploys contracts

const Web3 = require('web3');
const contract = require('truffle-contract');

const TicketSale = require('../build/contracts/TicketSale.json');

if (typeof web3 !== 'undefined') {
    web3Provider = web3.currentProvider;
} else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
}

var web3 = new Web3(web3Provider);

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var MyContract = contract(TicketSale);

// set default data for the contract - needs this or won't run
// =================TODO===========
// switch from setting address to grabbing address from metamask?
MyContract.defaults({
    from: '0x8812460e9f6361dfac76e37b1da12b0967126480',
    gas: 4712388,
    gasPrice: 100000000000
})

MyContract.setProvider(provider);


MyContract.at('0xb2395ec7caadf30184716d6374019d9558eb8ddb')
    .then(instance => {
        c = instance;
        c.setSupply(123)
        return c.getSupply();
    })
    .then(owner => {
        console.log(`Supply: ${owner}`);
    })
    .catch(error => {
        console.log(`${error}`);
    })


