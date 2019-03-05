import { Component, State, Prop } from '@stencil/core';

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
  @State() errorMessage: string;

  @Prop() stockSymbol: string;

  componentDidLoad() {
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  fetchStockPrice(stockSymbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid!');
        }

        return res.json();
      })
      .then(parsedRes => {
        const priceData = parsedRes['Global Quote']['05. price'];
        
        if (!priceData) {
          throw new Error('Invalid Symbol!');
        }
        
        this.errorMessage = null;
        this.price = Number(priceData);
      })
      .catch(err => {
        this.price = null;
        this.errorMessage = err.message;
      });
  }

  render() {
    let priceContent = <p>Please enter a stock symbol!</p>;

    if (this.errorMessage) {
      priceContent = <p>{this.errorMessage}</p>;
    }

    if (this.price) {
      priceContent = <p>Price: ${this.price}</p>
    }

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
        {priceContent}
      </div>
    ];
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();

    const stockSymbol = this.stockInput.value;

    this.fetchStockPrice(stockSymbol);
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;

    this.isStockInputValid = this.stockUserInput.trim() !== '' ? true : false;
  }
}
