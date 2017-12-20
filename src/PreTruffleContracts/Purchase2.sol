pragma solidity ^0.4.17;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    address public owner;
    uint256 public price;
    uint256 public supply;

    mapping(address => uint256) tickets;
    
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
    
    function setPrice(uint256 _price) {
        require(msg.sender == owner);
        price = _price * 1000000000000000000;
    }
    
    function getPrice() constant returns (uint256) {
        return price;
    }
    
    function buySingleTicket() payable returns (bool) {
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
    
    function buyMultipleTickets(uint256 _amount) payable returns (bool) {
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
    
    function numberOfTicketFromAddress(address _address) constant returns (uint256) {
        return tickets[_address];
    }
    
    function getAddress() constant returns (address) {
        return msg.sender;
    }
    
    function returnWeiInWallet() constant returns (uint256) {
        return msg.sender.balance;
    }
     
}