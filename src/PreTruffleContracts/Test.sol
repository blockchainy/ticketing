pragma solidity ^0.4.17;

contract Test {
    
    address public owner;

    function Test() payable {
        owner = msg.sender;
    }
    
    function () payable {
        fallBackCalled();
    }
    
    function fallBackCalled() constant returns (string) {
        return "fallback was called";
    }

    function getTime() constant returns (uint256) {
        return now;
    }
    
    function getOwner() constant returns (address) {
        return owner;
    }

    
    function getAddress() constant returns (address) {
        return msg.sender;
    }
    
 
     
}