pragma solidity ^0.4.16;

contract Ticket {
    address creator;
    uint256 time;
    uint256 amount;
    uint256 price;

    function Ticket() {
        creator = msg.sender;
    }

    function setTime(uint256 _time) {
        time = _time;
    }
    
    function setAmount(uint256 _amount) {
        amount = _amount;
    }
    
    function setPrice(uint256 _price) {
        price = _price;
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
    
    function kill() returns (bool) {
        selfdestruct(creator);
        return true;
    }
    
    function checkBalance() constant returns (uint256) {
        return creator.balance;
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
}
