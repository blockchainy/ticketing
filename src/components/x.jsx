// following code successfully interacts with the contract

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

MyContract.at('0x4a4147e09b157f4d80dbff7cc5cf3948702014a8')
    .then(instance => {
        c = instance;
        return c.getSupply();
    })
    .then(supply => {
        console.log(`Supply: ${supply}`);
        return c.howMuchEtherAtAddress('0x8812460e9f6361dfac76e37b1da12b0967126480')
    })
    .then(ether => {
        console.log(`Ether at address (in wei): ${ether}`);
        return c.howMuchEtherInContract()
    })
    .then(contract => {
        console.log(`Ether in contract: ${contract}`);
        return c.numberOfTicketFromAddress('0x4b43b516ec088a5c550ac7d3f6c69eb1bbd08e5c')
    })
    .then(tix => {
        console.log(`Tickets owner has: ${tix}`);
        return c.numberOfTicketFromAddress('0x8812460e9f6361dfac76e37b1da12b0967126480')
    })
    .then(tix2 => {
        console.log(`Number of tickets this user has (before): ${tix2}`);
        c.buyMultipleTickets(2, {value: 507087936329796580})
        return c.numberOfTicketFromAddress('0x8812460e9f6361dfac76e37b1da12b0967126480')
    })
    .then(tix3 => {
        console.log(`Number of tickets this user has (after): ${tix3}`);
        return c.howMuchEtherAtAddress('0x8812460e9f6361dfac76e37b1da12b0967126480')
    })
    .then(eth => {
        console.log(`Ether this user has after buying ticket: ${eth}`);
        return c.numberOfTicketFromAddress('0x4b43b516ec088a5c550ac7d3f6c69eb1bbd08e5c')
    })
    .then(tickets => {
        console.log(`Tickets owner has after sale: ${tickets}`);
    })
    .catch(error => {
        console.log(`${error}`);
    })


