import React, {Component} from 'react';

import Search from './Search.js';
import Inventory from './Inventory.js';
import Cart from './Cart.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItems: props.data,
      filteredItems: [],
      searchText: '',
      cartItems: []
    };
  }
  
  handleAddToCart(item, itemIndex, itemQty) {
    const newStock = item.stock - itemQty;
    const newItemList = this.state.inventoryItems;
    newItemList[itemIndex].stock = newStock;
    this.setState({
      inventoryItems: newItemList
    });
    this.handleUpdateCartItems(newItemList[itemIndex], itemQty);
  }

  handleUpdateCartItems(item, itemQty) {
    const newItem = item;
    const currentItemList = this.state.cartItems;
    let itemExist = 0;

    // Check if item already exists
    for (let i = 0; i < currentItemList.length && itemExist === 0; i++) {
      // If item exists, accumulate the quantity and the price accordingly
      if (currentItemList[i].code === newItem.code) {
        currentItemList[i].quantity+=itemQty;
        currentItemList[i].totalPrice+=parseFloat(newItem.price*itemQty);
        this.setState({
          cartItems: currentItemList
        });
        itemExist = 1;
      }
    }
    
    // If item does not exist, add it to the cart
    if (itemExist !== 1) {
      newItem.quantity = itemQty;
      newItem.totalPrice = item.price * itemQty;
      this.setState({
        cartItems: [...this.state.cartItems, newItem]
      });
    }
  }

  handleSearchTextChange(text) {
    const filteredList = this.state.inventoryItems.filter((item) => {
      return item.name.toLowerCase().indexOf(text.toLowerCase().trim()) !== -1;
    });
    this.setState({
      searchText: text,
      filteredItems: filteredList
    });
  }

  render() {
    return (
      <div className="shopping-cart">
        <Search
          searchText={this.state.searchText} 
          onSearchTextChange={this.handleSearchTextChange.bind(this)}/>
        <Inventory 
          data={this.state.searchText.length > 0 ? this.state.filteredItems : this.state.inventoryItems} 
          onAddToCart={this.handleAddToCart.bind(this)} 
        />
        <Cart cartItems={this.state.cartItems} />
      </div>
    )
  }
}

export default App;