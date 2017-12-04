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

// non remix deployment
// var contractInstance = MyContract.new()
// .then(instance => instance)
// .catch(error => console.log(`${error}`));


// console.log(`Contract instance: ${contractInstance}`);

// let meta;
MyContract.new()
    .then(instance => {
        meta = instance;
        return meta.getContractAddress();
    })
    .then(contractAddress => {
        console.log(`Contract address: ${contractAddress}`);
        return meta.getCreator();
    })
    .then(creator => {
        console.log(`Creator: ${creator}`)
    })
    .catch(error => {
        console.log(`${error}`);
    })

MyContract.new()
    .then(instance => {
        meta = instance;
        return meta.getContractAddress();
    })
    .then(contractAddress => {
        console.log(`Contract address: ${contractAddress}`);
        return meta.getCreator();
    })
    .then(creator => {
        console.log(`Creator: ${creator}`)
    })
    .catch(error => {
        console.log(`${error}`);
    })

// MyContract.deployed()
//     .then(instance => {
//         c = instance;
//         return c.getContractAddress();
//     })
//     .then(address => {
//         console.log(`Contract address: ${address}`);
//     })
//     .catch(error => {
//         console.log(`${error}`);
//     })


// MyContract.at('0xdec4db289327ad4781099bcf96ac0141785f5ef4')
//     .then(instance => {
//         c = instance;
//         return c.getCreator()
//     })
//     .then(creator => {
//         console.log(`Creator: ${creator}`);
//     })
//     .catch(error => {
//         console.log(`${error}`);
//     })


