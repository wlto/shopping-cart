import React, {Component} from 'react';

import Search from './Search.js';
import Inventory from './Inventory.js';
import Cart from './Cart.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    }
  }

  handleAddItemToCart(item, itemQty) {
    const newItem = item;
    const currentCartItemList = this.state.cartItems;
    let itemExist = 0;
    for (let i = 0; i < currentCartItemList.length && itemExist === 0; i++) {
      if (currentCartItemList[i].code === newItem.code) {
        currentCartItemList[i].quantity+=parseInt(itemQty);
        currentCartItemList[i].totalPrice+=parseFloat(newItem.price*itemQty);
        this.setState({
          cartItems: currentCartItemList
        });
        itemExist = 1;
      }
    }
    if (itemExist !== 1) {
      newItem.quantity = parseInt(itemQty);
      newItem.totalPrice = item.price * itemQty;
      this.setState({
        cartItems: [...this.state.cartItems, newItem]
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.cartItems);
  }

  render() {
    return (
      <div className="shopping-cart">
        <Search />
        <Inventory data={this.props.data} onAddItemToCart={this.handleAddItemToCart.bind(this)} />
        <Cart cartItems={this.state.cartItems} />
      </div>
    )
  }
}

export default App;