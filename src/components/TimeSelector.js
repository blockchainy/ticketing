import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../App.css';


class TimeSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });

        var myDate = new Date(date._d); // Your timezone!
        var myEpoch = myDate.getTime()/1000.0;
        console.log(myEpoch);
    }

    render() {
        return (
            <div>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
                dateFormat="LLL"
            />
          </div>
        )
    }
}

export default TimeSelector;