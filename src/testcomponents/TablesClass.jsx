import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class TableTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            header: 'props.header'
        }

        this.row = this.row.bind(this);

        console.log(`Data is: ${this.state.data}`);
    }

    row = (currentValue, index, header) => (
        <TableRow key={`t-${index}`}>
            {
                header.map((headerName, index) => (
                    <TableRowColumn key={`trc-${index}`}>
                        {currentValue[headerName.prop]}
                    </TableRowColumn>
                ))
            }
        </TableRow>
    );

    render() {
        // return (
        //     <Table>
        //         <TableHeader>
        //             <TableRow>
        //                 {
        //                     header.map((headerName, index) =>  // single line arrow implied return
        //                         <TableHeaderColumn key={`thc-${index}`}>
        //                             {headerName.name}
        //                         </TableHeaderColumn>
        //                     )
        //                 }
        //             </TableRow>
        //         </TableHeader>
        //         <TableBody>
        //             {data.map((currentValue, index) => this.row(currentValue, index, header))}
        //         </TableBody>
        //     </Table>
        // );
        return 'hello'
    }
}

export default TableTest;
