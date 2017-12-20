const Web3 = require('web3');
const contract = require('truffle-contract');

const HelloWorld = require('../build/contracts/HelloWorld.json')

// if (typeof web3 !== 'undefined') {
//     web3Provider = web3.currentProvider;
// } else {
//     // If no injected web3 instance is detected, fallback to the TestRPC
//     web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
// }

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var MyContract = contract(HelloWorld);
MyContract.setProvider(provider);

// non remix deployment
MyContract.new()
.then(instance => {
    c = instance;
    return c.getCreator();
})
.then(result => {
    console.log(result);
})
.catch(error => {
    console.log(`${error}`);
})
// // If deployed through remix
// MyContract.at('0xdec4db289327ad4781099bcf96ac0141785f5ef4')
//     .then(instance => {
//         c = instance;
//         return {
//             "address": c.getContractAddress(),
//             "creator": c.getCreator()
//         }
//     })
//     .then(address => {
//         console.log(`Contract address: ${address.address.then(address => { console.log(address) })}`);
//         console.log(`Creator: ${address.creator}`);
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


// MyContract.deployed()
//     .then(instance => {
//         c = instance;
//         return c.getContractAddress();
//     })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log(`${error}`);
//     })

// console.log(web3.eth.accounts);


// HelloWorld.new().then(instance => { contract1 = instance; return contract1;})
// var h = HelloWorld.getCreator();
// console.log(h);