import React, {Component} from 'react';

import Search from './Search.js';
import Inventory from './Inventory.js';
import Cart from './Cart.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItems: props.data,
      cartItems: []
    }
  }
  
  handleAddToCart(item, itemIndex, itemQty) {
    const newStock = item.stock - itemQty;
    const newItemList = this.state.inventoryItems;
    newItemList[itemIndex].stock = newStock;
    this.setState({
      inventoryItems: newItemList
    });
    this.updateCartItems(newItemList[itemIndex], itemQty);
  }

  updateCartItems(item, itemQty) {
    const newItem = item;
    const currentItemList = this.state.cartItems;
    let itemExist = 0;

    for (let i = 0; i < currentItemList.length && itemExist === 0; i++) {
      if (currentItemList[i].code === newItem.code) {
        // currentItemList[i] = {
        //   ...currentItemList[i],
        //   quantity: currentItemList[i].quantity + parseInt(itemQty, 10),
        //   totalPrice: currentItemList[i].totalPrice + parseFloat(newItem.price*itemQty)
        // };
        currentItemList[i].quantity+=itemQty;
        currentItemList[i].totalPrice+=parseFloat(newItem.price*itemQty);
        this.setState({
          cartItems: currentItemList
        });
        itemExist = 1;
      }
    }
    
    if (itemExist !== 1) {
      newItem.quantity = parseInt(itemQty, 10);
      newItem.totalPrice = item.price * itemQty;
      this.setState({
        cartItems: [...this.state.cartItems, newItem]
      });
    }
  }

  render() {
    return (
      <div className="shopping-cart">
        <Search />
        <Inventory 
          data={this.state.inventoryItems} 
          onAddToCart={this.handleAddToCart.bind(this)} 
          onAddItemToCart={this.updateCartItems.bind(this)} 
        />
        <Cart cartItems={this.state.cartItems} />
      </div>
    )
  }
}

export default App;