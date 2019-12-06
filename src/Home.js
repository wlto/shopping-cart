import React, {Component} from 'react';

import FilterableInventory from './FilterableInventory.js';
import Cart from './Cart.js';

class Home extends Component {
  render() {
    return (
      <div className="shopping-cart">
        <h1 className="shopping-cart__title">React Shopping Cart</h1>
        <FilterableInventory 
          inventoryItems={this.props.inventoryItems} 
          onUpdateCartItems={this.props.onUpdateCartItems.bind(this)} 
          onUpdateInventoryItem={this.props.onUpdateInventoryItem.bind(this)}
        />
        <Cart 
          cartItems={this.props.cartItems} 
          onRemoveFromCart={this.props.onRemoveFromCart.bind(this)}
          totalPrice={this.props.totalPrice} 
        />
      </div>
    );
  }
}

export default Home;