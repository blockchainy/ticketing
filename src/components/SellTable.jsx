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


// create a row function that generates a different row based off data array 
// data array is passed from table

const row = (currentValue, index, header) => (
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
      <RaisedButton
        icon={<BuyTicketIcon />}
      />
    </TableRowColumn>
  </TableRow>
);

// in case you forget later, this is a functional component
// takes in two props
export default ({ data, header }) => {
  return (
  <div>
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
            header
          )
        )}
      </TableBody>
    </Table>
    <p>{data}</p>
  </div>
  )
}
