import { Component, State } from '@stencil/core';

import { AV_API_KEY } from '../../config/config';

@Component({
  tag: 'codecartel-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  @State() price: number;

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: ${this.price}</p>
      </div>
    ];
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.price = Number(parsedRes['Global Quote']['05. price']);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
