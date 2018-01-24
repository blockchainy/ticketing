pragma solidity ^0.4.15;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    address public owner;
    uint256 public price;
    uint256 public supply;
    uint256 public time;
    string public name;
    uint256 id;

    address[] sellers;

    mapping(address => uint256) tickets;
    mapping(address => uint256) forSale;
    mapping (address => uint256) public arrayIndexes;

    bool public afterMarket = true;    
    
    function TicketSale() payable {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }

    function setAfterMarket(bool _status) {
        require(msg.sender == owner);
        if (_status = true) {
            afterMarket = true;
        } else {
            afterMarket = false;
        }
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

    function setTime(uint256 _time) {
        require(msg.sender == owner);
        time = _time;
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

    function getCurrentSupply() constant returns (uint256) {
        return tickets[owner];
    }

    function getTime() constant returns (uint256) {
        return time;
    }
    
    function useTicket() public {
        require(
            // now >= time &&
            tickets[msg.sender] >= 1
         );
        tickets[msg.sender] = tickets[msg.sender].sub(1);
    }

    function getCurrentTime() constant returns (uint256) {
        return now;
    }

    function buyMultipleTickets(uint256 _amount) payable returns (bool) {
        uint256 ticketPrice = price.mul(_amount);
        require(
            tickets[owner] >= _amount && 
            msg.value >= ticketPrice
            );

        if (msg.value > ticketPrice) {
            uint256 amountTransferBack = msg.value.sub(price);
            msg.sender.transfer(amountTransferBack);
        }
        
        this.transfer(msg.value.sub(ticketPrice));

        tickets[owner] = tickets[owner].sub(_amount);
        tickets[msg.sender] = tickets[msg.sender].add(_amount);
        return true;
    }

    function buyTicketFromSeller(address buyFrom) public payable {
        require(
            forSale[buyFrom] >= 1 && 
            msg.value >= price &&
            afterMarket == true
        );
        
        // this line refunds
        msg.sender.transfer(msg.value.sub(price));
        // this gives the seller the ether
        buyFrom.transfer(price);
        
        forSale[buyFrom] = forSale[buyFrom].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);

        // remove from sellers array
        if (forSale[buyFrom] < 1) {
            id = arrayIndexes[buyFrom];
            delete sellers[id];
        }
    }

    function sellTicket() public {
        require(tickets[msg.sender] >= 1 && afterMarket == true);
        
        if (forSale[msg.sender] == 0) {
            // can't delete at array, refer to eth.x
            
            id = sellers.length;
            arrayIndexes[msg.sender] = id;
            sellers.push(msg.sender);
        }
        
        tickets[msg.sender] = tickets[msg.sender].sub(1);
        forSale[msg.sender] = forSale[msg.sender].add(1);
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

    function ticketsAtForSale(address _address) constant returns (uint256) {
        return forSale[_address];
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
    
    function getSellers() public constant returns (address[]) {
        return sellers;
    }
    
    function returnWeiInWallet() constant returns (uint256) {
        return msg.sender.balance;
    }

    function cashOut() constant returns (bool) {
        require(
            msg.sender == owner &&
            now >= time
            );
        selfdestruct(owner);
        return true;
    }
     
}