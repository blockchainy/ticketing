import React, { Component } from 'react';

class Issuer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            price: ''
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
      }
    
      handleNumber(event) {
        this.setState({number: event.target.value});
      }

      handlePrice(event) {
        this.setState({price: event.target.value});
      }
    
      handleSubmit() {
        console.log(`# of tix submitted is: ${this.state.value}`);
        console.log(`Price per tix submitted is: ${this.state.value}`);
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                     Number of Tickets:
                    <input type="text" value={this.state.number} onChange={this.handleNumber} />
                    </div>
                    <div>
                     Ticket Price in Wei:
                    <input type="text" value={this.state.price} onChange={this.handlePrice} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Issuer;