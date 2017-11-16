import React, { Component } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';


class Test extends Component {
    constructor(props) {
        super(props);

        this.getUSD = this.getUSD.bind(this);


        this.state = {
            priceOfEther: '',
            price: '',
            priceInWei: '',
        }
    }

    componentWillMount() {
        axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/')
            .then(response => {
                this.setState({ priceOfEther: response.data[0].price_usd });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUSD() {
        // enteredPrice/pulled ether price = how much ether
        // convert that amount of ether into wei
        var priceInEther = this.state.price / this.state.priceOfEther;
        var priceInWei = priceInEther * 1000000000000000000;
        this.setState({ priceInWei });
    }

    render() {
        return (
            <div>
                Current Ether price in USD is: ${this.state.priceOfEther}
                <p></p>
                Enter price in USD: 
                   
                <p></p>
                <input
                    onChange={event => this.setState({ price: event.target.value })}
                />
                <p></p>

                <button class="ui animated button" tabindex="0" onClick={this.getUSD}>
                    <div class="visible content">Calculate price in Wei!</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <p></p>
                <div>
                    Price in Wei : {this.state.priceInWei} Wei
                </div>
            </div>

        );
    }
}

export default Test;