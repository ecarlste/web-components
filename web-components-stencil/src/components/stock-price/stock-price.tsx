import { Component, State } from '@stencil/core';

import { AV_API_KEY } from '../../config/config';

@Component({
  tag: 'codecartel-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @State() price: number;
  @State() stockUserInput
  @State() isStockInputValid = false;

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          ref={element => this.stockInput = element}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.isStockInputValid}>Fetch</button>
      </form>,
      <div>
        <p>Price: ${this.price}</p>
      </div>
    ];
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();

    const stockSymbol = this.stockInput.value;

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
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

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;

    this.isStockInputValid = this.stockUserInput.trim() !== '' ? true : false;
  }
}
