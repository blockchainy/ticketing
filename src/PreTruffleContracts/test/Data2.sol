pragma solidity ^0.4.14;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    event Purchase(address indexed _seller, address indexed _buyer);
    event AfterMarketPurchase(address indexed _seller, address indexed _buyer);
    
    address public owner;

    uint256 public priceInWei;
    uint256 public supply;
    uint256 public time;
    bool public enableAfterMarket = false;

    bytes32 public name;


    address[] public sellers;
    bool afterMarketIsClosed;
    mapping(address => uint256) tickets;
    mapping(address => uint256) forSale;
    
    function TicketSale() {
        owner = msg.sender;
    }

    // create setters and getters
    function setTime(uint256 _time) {
        time = _time;
    }
    
    function setSupply(uint256 _supply) {
        supply = _supply;
        tickets[owner] = _supply;
    }
    
    function setPrice(uint256 _price) {
        price = _price;
    }

    function setName(bytes32 _name) {
        name = _name;
    }

    function enableAfterMarket() {
        enableAfterMarket = true;
    }

    function getTime() constant returns (uint256) {
        return time;
    }
    
    function getAmount() constant returns (uint256) {
        return amount;
    }
    
    function getPrice() constant returns (uint256) {
        return price;
    }
    
    function getName() constant returns (bytes32) {
        return name;
    }
    
    // functions B2C
    function buyTicketFromIssuer() payable returns (bool) {
        require(tickets[owner] >= 1 && msg.value >= priceInWei);
        
        // give owner price of ticket
        owner.transfer(msg.value.sub(priceInWei));
        
        tickets[owner] = tickets[owner].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        
        Purchase(owner, msg.sender);
        
        return true;
    }
    
    function buyMultipleTickets(uint256 _amount) payable returns (bool) {
        uint256 price = priceInWei * _amount;
        require(
            tickets[owner] >= _amount && 
            msg.value >= price
            );
        
        // give owner price of ticket
        owner.transfer(msg.value.sub(price));
        
        tickets[owner] = tickets[owner].sub(_amount);
        tickets[msg.sender] = tickets[msg.sender].add(_amount);
        
        Purchase(owner, msg.sender);
        
        return true;
    }

    // functions C2C
    function sellTicket() returns (bool) {
        require(tickets[msg.sender] >= 1 && afterMarketIsClosed == false);
        
        if (forSale[msg.sender] == 0) {
            sellers.push(msg.sender);
        }
        
        tickets[msg.sender] = tickets[msg.sender].sub(1);
        forSale[msg.sender] = forSale[msg.sender].add(1);
        
        return true;
    }
    
    function buyTicketFromSeller(address buyFrom) payable returns (bool) {
        require(
            forSale[buyFrom] >= 1 &&
            msg.value >= priceInWei && 
            afterMarketIsClosed == false
        );
        
        msg.sender.transfer(msg.value.sub(priceInWei));
        buyFrom.transfer(priceInWei);
        
        forSale[buyFrom] = forSale[buyFrom].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        
        AfterMarketPurchase(buyFrom, msg.sender);
        
        return true;
    }
    
    function buyTicketFromAnySeller() payable returns (bool) {
        require(afterMarketIsClosed == false);
        
        bool isSucessful = false;
        for (uint index = 0; index < sellers.length; index++) {
            address seller = sellers[index];
            if (forSale[seller] >= 1) {
                buyTicketFromSeller(seller);
                isSucessful = true;
                break;
            }
        }
        
        return isSucessful;
    }
    
    function closeAfterMarket() returns (bool) {
        require(msg.sender == owner);
        
        if (!afterMarketIsClosed) {
            afterMarketIsClosed = true;
            for (uint index = 0; index < sellers.length; index++) {
                address seller = sellers[index];
                if (forSale[seller] >= 1) {
                    tickets[seller] = tickets[seller].add(forSale[seller]);
                }
            }
        }
        
        return true;
    }
    
    function useTicket() returns (bool) {
        // TODO: can only use ticket at the after the start of the event
        require(tickets[msg.sender] >= 1);
        tickets[msg.sender] = tickets[msg.sender].sub(1);
        
        return true;
    }
    
    function numberOfTickets() constant returns (uint256) {
        return tickets[msg.sender];
    }
    
    function haveTicket() constant returns (bool) {
        return tickets[msg.sender] >= 1;
    }
    
    // TODO: implement a refund all feature
    
    function cashOut() returns (bool) {
        // TODO: owner can only cash out after 30 days of event
        require(msg.sender == owner);
        owner.transfer(this.balance);
        return true;
    }
    
    function kill() returns (bool) {
        require(
            msg.sender == owner &&
            now >= time
        );
        selfdestruct(owner);
        return true;
    }
}