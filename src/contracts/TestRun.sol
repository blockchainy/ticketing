pragma solidity ^0.4.15;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    address public owner;
    uint256 public price;
    uint256 public supply;
    string public name;

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
        price = _price;
    }

    function setName(string _name) {
        require(msg.sender == owner);
        name = _name;
    }
    
    function getPrice() constant returns (uint256) {
        return price;
    }

    function getName() constant returns (string) {
        return name;
    }
    
    function getSupply() constant returns (uint256) {
        return supply;
    }
    
    function buyMultipleTickets(uint256 _amount) payable returns (bool) {
        uint256 ticketPrice = price.mul(_amount);
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
    
    function getCurrentAddress() constant returns (address) {
        return msg.sender;
    }

    function getContractAddress() constant returns (address) {
        return this;
    }

    function getOwner() constant returns (address) {
        return owner;
    }
    
    function returnWeiInWallet() constant returns (uint256) {
        return msg.sender.balance;
    }

    function killContract() constant returns (bool) {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
     
}