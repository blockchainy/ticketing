pragma solidity ^0.4.4;

contract HelloWorld {

  address private creator;
  address private lastCaller;
  string private message;
  uint private totalGas;
  //End: state variables

  //Begin: constructor
  function HelloWorld() {
    /*
      We can use the special variable `tx` which gives us information
      about the current transaction.

      `tx.origin` returns the sender of the transaction.
      `tx.gasprice` returns how much we pay for the transaction
    */
    creator = msg.sender;
    message = "hello world";
  }
  //End: constructor

  //Begin: getters
  function getMessage() constant returns(string) {
    return message;
  }

  function getLastCaller() constant returns(address) {
    return lastCaller;
  }

  function getCreator() constant returns(address) {
    return creator;
  }
  //End: getters
  
  function getContractAddress() constant returns(address) {
      return this;
  }

  //Being: setters
  function setMessage(string newMessage) {
    message = newMessage;
    lastCaller = tx.origin;
  }
  //End: setters
}
