pragma solidity ^0.4.14;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    event Purchase(address indexed _seller, address indexed _buyer);
    event AfterMarketPurchase(address indexed _seller, address indexed _buyer);
    
    address public owner;
    uint256 public price;
    uint256 public supply;

    mapping(address => uint256) tickets;
    mapping (address => uint256) public balanceOf;

    function TicketSale() {
        owner = msg.sender;
    }
    
    function getEthBalance(address _addr) constant returns(uint) {
        return _addr.balance;
    }
  
    function setSupply(uint256 _supply) {
        supply = _supply;
        tickets[owner] = _supply;
    }
    
    function setPrice(uint256 _price) {
        require(msg.sender == owner);
        price = _price * 1000000000000000000;
    }

    function getSupply() constant returns (uint256) {
        return supply;
    }
    
    function getPrice() constant returns (uint256) {
        return price;
    }
    
    function transferToOwner() payable returns (bool) {
        owner.transfer(msg.value.sub(1000000000000000000));
        return true;
    }
    
    function getMsgValue() constant returns (uint256) {
        return msg.sender.balance;
    }
    
    function getBalance() constant returns (uint) {
        return this.balance;
    }

    function numberOfTicketFromAddress(address _address) constant returns (uint256) {
        return tickets[_address];
    }

    // functions B2C
    function buyTicketFromIssuer() payable returns (bool) {
        require(tickets[owner] >= 1 && msg.value >= price);
        
        // give owner price of ticket
        msg.sender.transfer(msg.value.sub(price));
        
        tickets[owner] = tickets[owner].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        
        Purchase(owner, msg.sender);
        
        return true;
    }
    
}