pragma solidity ^0.4.14;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
    
    event Purchase(address indexed _seller, address indexed _buyer);
    event AfterMarketPurchase(address indexed _seller, address indexed _buyer);
    
    address public owner;
    uint256 public priceInWei;
    bytes32 public name;
    address[] public sellers;
    bool afterMarketIsClosed;
    mapping(address => uint256) tickets;
    mapping(address => uint256) forSale;
    
    function TicketSale(uint256 _supply, uint256 _priceInWei, bytes32 _name, bool _enableAfterMarket) {
        owner = msg.sender;
        tickets[owner] = _supply;
        priceInWei = _priceInWei;
        name = _name;
        afterMarketIsClosed = !_enableAfterMarket;
        // TODO: implement time of the event
    }
    
    
    // functions B2C
    function buyTicketFromIssuer() payable returns (bool) {
        require(tickets[owner] >= 1 && msg.value >= priceInWei);
        
        msg.sender.transfer(msg.value.sub(priceInWei));
        
        tickets[owner] = tickets[owner].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        
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