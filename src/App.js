import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Home.js'
import Checkout from './Checkout.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItems: props.data,
      cartItems: [],
      totalPrice: 0
    };
  }
  
  render() {
    return (
      <Switch>
    <Route exact path='/' render={() => (
        <Home
         inventoryItems={this.state.inventoryItems}
          cartItems = {this.state.cartItems}
        totalPrice = {this.state.totalPrice}
         />
    )}/>
    <Route exact path='/' render={() => (
        <Home
         inventoryItems={this.state.inventoryItems}
          cartItems = {this.state.cartItems}
        totalPrice = {this.state.totalPrice}
         />
    )}/>
    <Route exact path='/Checkout' render={() => (
        <Checkout
        inventoryItems={this.state.inventoryItems}
         cartItems = {this.state.cartItems}
        totalPrice = {this.state.totalPrice}
        />
    )}/>
    )}/>
</Switch>
    );
  }
}

export default App;