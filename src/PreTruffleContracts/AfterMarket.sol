pragma solidity ^0.4.14;

import './SafeMath.sol';

contract TicketSale {
    
    using SafeMath for uint256;
   
    address public owner;
    uint256 public price;
    uint256 public supply;
    
    string public name;
    
    address[] sellers;
    
    bool public afterMarketIsClosed = false;
    
    mapping(address => uint256) tickets;
    mapping(address => uint256) forSale;
    
    function TicketSale() public {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }
   
    function setSupply(uint256 _supply) {
        supply = _supply;
        tickets[owner] = _supply;
    }
    
    function setPrice(uint256 _price) {
        require(msg.sender == owner);
        price = _price * 1000000000000000000;
    }
    
    function setName (string _name) {
        name = _name;
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
    
    function sellTicket() public {
        require(tickets[msg.sender] >= 1 && afterMarketIsClosed == false);
        
        if (forSale[msg.sender] == 0) {
            sellers.push(msg.sender);
        }
        
        tickets[msg.sender] = tickets[msg.sender].sub(1);
        forSale[msg.sender] = forSale[msg.sender].add(1);
    }
    
    function ticketsAtForSale(address _address) constant returns (uint256) {
        return forSale[_address];
    }
    
    function ticketsAtAddress(address _address) constant returns (uint256) {
        return tickets[_address];
    }
    
    function buyTicketFromSeller(address buyFrom) public payable {
        require(
            forSale[buyFrom] >= 1 &&
            msg.value >= price &&
            afterMarketIsClosed == false
        );
        
        // this line refunds
        msg.sender.transfer(msg.value.sub(price));
        // this gives the seller the ether
        buyFrom.transfer(price);
        
        forSale[buyFrom] = forSale[buyFrom].sub(1);
        tickets[msg.sender] = tickets[msg.sender].add(1);
        
    }
    
    function buyTicketFromAnySeller() public payable {
        require(afterMarketIsClosed == false);
        
        for (uint index = 0; index < sellers.length; index++) {
            address seller = sellers[index];
            if (forSale[seller] >= 1) {
                buyTicketFromSeller(seller);
                break;
            }
        }
    }
    
    function closeAfterMarket() public {
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
    }
    
    function useTicket() public {
        // TODO: can only use ticket at the after the start of the event
        require(tickets[msg.sender] >= 1);
        tickets[msg.sender] = tickets[msg.sender].sub(1);
    }
    
    function numberOfTickets() public constant returns (uint256) {
        return tickets[msg.sender];
    }
    
    function haveTicket() public constant returns (bool) {
        return tickets[msg.sender] >= 1;
    }
    
    // function refundAll() constant returns (bool) {
    //     require(msg.sender == owner);
    //     for (uint i = 1; i < tickets.length; i++) {
       
    //         // uint256 priceRefund = tickets[i] * price;
    //         // balanceOf['person'].transfer(priceRefund);
    //     }
    //     return true;
    // }
    
    // TODO: implement a refund all feature
    
    function cashOut() public {
        // TODO: owner can only cash out after 30 days of event
        require(msg.sender == owner);
        owner.transfer(this.balance);
    }
    
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }

    function ping() public constant returns (string) {
        return "pong";
    }
}
