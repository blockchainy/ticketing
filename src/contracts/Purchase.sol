pragma solidity ^0.4.17;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    address public owner;
    uint256 public price;
    uint256 public supply;

    mapping(address => uint256) tickets;
    
    event TestLog(uint256 indexed _number, uint256 indexed _price, uint256 indexed _msgvalue);

    function TicketSale() payable {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }
    
    function setSupply(uint256 _supply) {
        require(msg.sender == owner);
        supply = _supply;
        tickets[owner] = _supply;
    }
    
    // convert inputting price in ether 
    function setPrice(uint256 _price) {
        require(msg.sender == owner);
        price = _price * 1000000000000000000;
    }
    
    // run function to check/test how many tickets are at address
    function numberOfTicketFromAddress(address _address) constant returns (uint256) {
        return tickets[_address];
    }
    
    // test to see if you can transfer msg.value to contarct address
    function transferToContract() payable returns (bool) {
        this.transfer(msg.value);
        return true;
    }
    
    // should return all wei/ether inside contract to owner
    function kill() payable returns (bool) {
        // make kill only usable after given time
        selfdestruct(owner);
        return true;
    }
    
    function buyTicketsFromIssuer() payable returns (bool) {
        
        require(tickets[owner] >= 1 && msg.value >= price);
        
        this.transfer(msg.value.sub(price));
        
        tickets[owner] = tickets[owner].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        
        return true;
    }
    
    // buying ticket and issues refund if amount is more than price
    function buyTicketFromIssuerRefund() payable returns (bool) {
        require(tickets[owner] >= 1 && msg.value >= price);
        
        if(msg.value == price) {
            this.transfer(msg.value.sub(price));
        } else {
            this.transfer(msg.value.sub(price));
            msg.sender.transfer(msg.value.sub(price));
        }

        tickets[owner] = tickets[owner].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        return true;
    }

    // buying multiple tickets
    function buyTickets(uint256 _amount) payable returns (bool) {
        uint256 ticketPrice = price * _amount;
        require(
            tickets[owner] >= _amount && 
            msg.value >= ticketPrice
            );
        
        if (msg.value == ticketPrice) {
            this.transfer(msg.value.sub(ticketPrice));
        } else {
            this.transfer(msg.value.sub(ticketPrice));
            msg.sender.transfer(msg.value.sub(ticketPrice));
        }

        tickets[owner] = tickets[owner].sub(_amount);
        tickets[msg.sender] = tickets[msg.sender].add(_amount);
        return true;
    } 
    
    function howMuchEtherAtAddress (address _address) constant returns (uint256) {
        return _address.balance;
    }
    
    function howMuchEtherInContract() constant returns (uint256) {
        return this.balance;
    }
    
}