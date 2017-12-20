import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Web3 from 'web3';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'semantic-ui-css/semantic.min.css';

import '../App.css';

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var myContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"setAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_time","type":"uint256"}],"name":"setTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}])
var contractInstance = myContract.at('0x486351a2b3f3f63c04aeec19281cc7293cab8337');

web3.eth.defaultAccount = web3.eth.accounts[0];

class TimeSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            currentTime: 0,
            data: 0
        };
        this.selectDate = this.selectDate.bind(this);
        this.setTime = this.setTime.bind(this);
        this.getTime = this.getTime.bind(this);        
        this.checkNow = this.checkNow.bind(this);
    }

    selectDate(date) {
        var myDate = new Date(date._d); // Your timezone!
        var myEpoch = myDate.getTime() / 1000.0;

        this.setState({
            startDate: date, 
            currentTime: myEpoch
        });
        console.log(myEpoch);
    }

    setTime() {
        // check to see if smart contracts can compare strings
        contractInstance.setTime(this.state.currentTime)
        var time = contractInstance.getTime();
        console.log(`Current Time in smart contract is: ${time}`);
    }

    getTime() {
        var updatedTime = contractInstance.getTime();
        console.log(`Updated Time: ${updatedTime}`);
    }

    checkNow() {
        var now = contractInstance.getNowTime();
        console.log(`Now variable should be here: ${now}`);
    }


    render() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.selectDate}
                    showTimeSelect
                    dateFormat="LLL"
                />
                <p></p>

                <button class="ui animated button" tabindex="0" onClick={this.setTime}>
                    <div class="visible content">Submit Time</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>

                <button class="ui animated button" tabindex="0" onClick={this.getTime}>
                    <div class="visible content">Check Time</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>

                <button class="ui animated button" tabindex="0" onClick={this.checkNow}>
                    <div class="visible content">Check Now</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>

            </div>
        )
    }
}

export default TimeSelector;



