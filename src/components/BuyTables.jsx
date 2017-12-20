import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Route, Link } from 'react-router-dom';

import '../App.css';

import RaisedButton from 'material-ui/RaisedButton';
import BuyTicketIcon from 'material-ui/svg-icons/action/add-shopping-cart';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';

import TicketInfo from '../testcomponents/router';

// create a row function that generates a different row based off data array 
// data array is passed from table

// =======TODO=======
// add a buy button as another tablerowcolumn 
const row = (currentValue, index, header, buyTicket) => (
  <TableRow key={`t-${index}`} selectable={false}>
    {
      header.map((headerName, index) => {
        return (
          <TableRowColumn key={`trc-${index}`}>
            {currentValue[headerName.prop]}
          </TableRowColumn>
        )
      })
    }
    <TableRowColumn>
      {/* <BuyTicketIcon class="icon-button" onClick={() => buyTicket(index)} /> */}
      <Link to={`/ticketinfo/${currentValue['contractAddress']}`}>
        <RaisedButton
          icon={<InfoIcon />}
        />
        {/* <InfoIcon class="icon-button" /> */}
      </Link>
    </TableRowColumn>
  </TableRow>
);

// row = { contractAddress: '0x4a4147e09b157f4d80dbff7cc5cf3948702014a8',
//     ticketName: 'CNT' }, index which is 0, header[]


// currentValue = 
// { contractAddress: '0x4a4147e09b157f4d80dbff7cc5cf3948702014a8',
//   ticketName: 'CNT' }

// header.map = 
// headername = contract address
// for each header name create tablerowcolumn and set data
// data is 
// currentValue[headerName]
// { contractAddress: '0x4a4147e09b157f4d80dbff7cc5cf3948702014a8',
//   ticketName: 'CNT' }['contractAddress']

// headerName should be set equal to tableName


// header = {
// [
//   {
//     name: "Contract Address",
//     prop: "contractAddress",
//     data: this.state.contractAddress
//   },
//   {
//     name: "Ticket Name",
//     prop: "ticketName"
//   },
//   {
//     name: "Price",
//     prop: "price"
//   },
//   {
//     name: "Supply",
//     prop: "supply"
//   }
// ]}

// [ { contractAddress: '0x4a4147e09b157f4d80dbff7cc5cf3948702014a8',
//     ticketName: 'CNT' },
//   { contractAddress: '0x6828478d1c4522cdd3e164ff6c521182fb8366ea',
//     ticketName: 'OMG' },
//   { contractAddress: '0x79d7c635f059222433b219b20b09b9613a7ad35b',
//     ticketName: 'GNT' },
//   { contractAddress: '0x8d8d4a76f94959f0a5825ce7a3d2ab853fb22bb7',
//     ticketName: 'REP' },
//   { contractAddress: '0xe85c47b1ebc155891632431948523af32c0be20e',
//     ticketName: 'BCH' } ]

// in case you forget later, this is a functional component
// takes in two props
export default ({ data, header, buyTicket }) =>
  <Table>
    <TableHeader>
      <TableRow>
        {
          header.map((headerName, index) =>  // single line arrow implied return
            <TableHeaderColumn key={`thc-${index}`}>
              {headerName.name}
            </TableHeaderColumn>
          )
        }
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((currentValue, index) =>
        row(
          currentValue,
          index,
          header,
          buyTicket
        )
      )}
    </TableBody>
  </Table>

