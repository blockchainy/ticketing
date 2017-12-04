// trying to compile with solc/fs/web3
// add DATA to fix

const fs = require("fs");
const solc = require('solc');
const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


let source = fs.readFileSync('Test.sol', 'utf8');

// console.log(`Source : ${source}`);

let compiledContract = solc.compile(source, 1);

// console.log(`CompiledContract : ${compiledContract}`);

let abi = compiledContract.contracts['Test'].interface;

console.log(`ABI : ${abi}`);

let bytecode = compiledContract.contracts['Test.sol'].bytecode;

console.log(`Bytecode : ${bytecode}`);

let gasEstimate = web3.eth.estimateGas({data: bytecode});

console.log(`Gas Estimate : ${gasEstimate}`);

let MyContract = web3.eth.contract(JSON.parse(abi));

console.log(`MyContract : ${MyContract}`);


var myContractReturned = MyContract.new({
   from: web3.eth.accounts[2],
   data:bytecode,
   gas:gasEstimate}, function(err, myContract){
    if(!err) {
       // NOTE: The callback will fire twice!
       // Once the contract has the transactionHash property set and once its deployed on an address.

       // e.g. check tx hash on the first call (transaction send)
       if(!myContract.address) {
           console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
       
       // check address on the second call (contract deployed)
       } else {
           console.log(myContract.address) // the contract address
       }

       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
    }
  });

// Deploy contract syncronous: The address will be added as soon as the contract is mined.
// Additionally you can watch the transaction by using the "transactionHash" property
var myContractInstance = MyContract.new(param1, param2, {data: myContractCode, gas: 300000, from: mySenderAddress});
myContractInstance.transactionHash // The hash of the transaction, which created the contract
myContractInstance.address