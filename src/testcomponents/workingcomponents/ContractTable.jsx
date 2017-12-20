import React, { Component } from 'react';
import axios from 'axios';


// import Table from './Tables';
import TableTest from './Tables';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ContractTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractAddress: [],
            ticketName: [],
            data: []
        };

        this.postInfo = this.postInfo.bind(this);
    }

    componentWillMount() {
        // load up data from db into state
        this.postInfo();
    }

    buyTicket(i) {
        // index is going to be contract address
        contractAddress[i]
        
    }

    render() {
        <p></p>
        return (
            <div>
                <p></p>
                <MuiThemeProvider>
                    <TableTest
                        buyTicket={this.buyTicket}
                        data={this.state.data}
                        header={[
                            {
                                name: "Contract Address",
                                prop: "contractAddress",
                                data: this.state.contractAddress
                            },
                            {
                                name: "Ticket Name",
                                prop: "ticketName"
                            },
                            {
                                name: "Price",
                                prop: "price"
                            },
                            {
                                name: "Supply",
                                prop: "supply"
                            }
                        ]}
                    />
                </MuiThemeProvider>
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
                    ticketName,
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

export default ContractTable;