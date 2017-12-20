import React, { Component } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';


class PriceBox extends Component {
    constructor(props) {
        super(props);

        // this.calculatePriceInUSD = this.calculatePriceInUSD.bind(this);
        this.calculatePriceFromEther = this.calculatePriceFromEther.bind(this);
        this.calculatePriceFromWei = this.calculatePriceFromWei.bind(this);
        this.etherOrGwei = this.etherOrWei.bind(this);

        this.state = {
            priceOfEther: '',
            price: '',
            priceInUSD: '',
            unit: 'Please select a unit'
        }
    }

    calculatePriceFromWei() {
        // 1 ether = 1000000000000000000 wei
        var priceInEther = this.state.price / 1000000000000000000;
        var priceInUSD = priceInEther * this.state.priceOfEther;
        //priceInUSD = Math.round(priceInUSD * 100) / 1000
        this.setState({ priceInUSD });
    }

    calculatePriceFromEther() {
        // 1 ether = 1000000000 gwei
        var priceInUSD = this.state.price * this.state.priceOfEther;
        priceInUSD = Math.round(priceInUSD * 100) / 1000
        this.setState({ priceInUSD });
    }

    etherOrWei() {
        if (this.state.unit === 'Ether') {
            this.calculatePriceFromEther();
        } else if (this.state.unit === 'Wei') {
            this.calculatePriceFromWei();
        } else {
            this.setState({ priceInUSD: 'Select some shit nigga' })
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

    render() {
        return (
            <div>
                Current Ether price in USD is: ${this.state.priceOfEther}
                <p></p>
                Enter price in <div className="ui compact menu">
                    <div className="ui simple dropdown item">
                        {this.state.unit}
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <div
                                className="item"
                                onClick={() => this.setState({ unit: 'Ether' })}
                            >
                                Ether
                        </div>
                            <div
                                className="item"
                                onClick={() => this.setState({ unit: 'Wei' })}
                            >
                                Wei
                        </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <input
                    onChange={event => this.setState({ price: event.target.value })}
                />
                <p></p>

                <button class="ui animated button" tabindex="0" onClick={this.etherOrGwei}>
                    <div class="visible content">Calculate price in USD!</div>
                    <div class="hidden content">
                        <i class="right arrow icon"></i>
                    </div>
                </button>
                <p></p>
                <div>
                    Price in USD : ${this.state.priceInUSD}
                </div>
            </div>

        );
    }
}

export default PriceBox;