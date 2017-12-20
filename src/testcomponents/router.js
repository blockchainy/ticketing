import React, { Component } from 'react';


class Info extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log(`This.props.data: ${this.props.data}`);
    }
    render() {
        return (
            <div>
                {JSON.stringify(this.props.data)}
            </div>

        );
    }
}

export default Info;