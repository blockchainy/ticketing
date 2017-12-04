var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


var myContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"string"}],"name":"setTokenName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"string"}],"name":"setName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_tokenName","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
var contractInstance = myContract.at('0xd0e94250bbe7d364fed9d0f7c98b4513dbc12269');

web3.eth.defaultAccount = web3.eth.accounts[0];

var result = contractInstance.get();

// set the name to test upon contract creation
console.log(`This should be test: ${result}`);


contractInstance.setTokenName("UPDATED");

var updatedresult = contractInstance.get();
console.log(`updated name should be here: ${updatedresult}`);












// contractInstance.setTokenName('UPDADSJDWNJ',{value: 200, gas: 2000});
