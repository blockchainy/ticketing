// testing REST API with axios and setting data into state
// don't need to push array, just have response.data
// moved onto ContractTable.jsx 

import React, { Component } from 'react';

import axios from 'axios';

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractAddress: [],
            ticketName: [],
        };
        this.postInfo = this.postInfo.bind(this);
    }

    render() {

        <p></p>
        return (
            <div>
                <p></p>
                <button onClick={this.postInfo}>Should run to database</button>
                <p></p>
            </div>
        );
    }

    // grabs every row data from db and store it within state 
    // =====SHOULD NOT RUN TWICE OR KEEPS APPENDING TO STATE=====
    postInfo() {
        axios.get('http://localhost:1337/selectAll')
            .then(response => {
                const contractAddress = this.state.contractAddress.slice()
                const ticketName = this.state.ticketName.slice()

                for (var i = 0; i < response.data.length; i++) {
                    contractAddress.push(response.data[i].contractAddress)
                    ticketName.push(response.data[i].ticketName)
                }

                this.setState({
                    contractAddress,
                    ticketName
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export default Database;