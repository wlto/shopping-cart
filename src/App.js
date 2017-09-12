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
  
  handleSearchTextChange(text) {
    // Returns items each of which has a name that matches the search text
    const filteredList = this.state.inventoryItems.filter((item) => {
      return item.name.toLowerCase().indexOf(text.toLowerCase().trim()) !== -1;
    });
    this.setState({
      searchText: text,
      filteredItems: filteredList
    });
  }
  
  handleAddToCart(itemStock, itemIndex, itemQty) {
    const newStock = itemStock - itemQty;
    const newItemList = this.state.inventoryItems;
    newItemList[itemIndex].stock = newStock;
    this.setState({
      inventoryItems: newItemList
    });
    this.handleUpdateCartItems(itemIndex, newItemList[itemIndex].code, newItemList[itemIndex].name, newItemList[itemIndex].price, itemQty);
  }

  handleUpdateCartItems(itemIndexInInventory, itemCode, itemName, itemPrice, itemQty) {
    const currentItemList = this.state.cartItems;
    let itemExist = 0;
    let newItem = {};

    // Check if item already exists
    for (let i = 0; i < currentItemList.length && itemExist === 0; i++) {
      // If item exists, update the quantity and price
      if (currentItemList[i].code === itemCode) {
        currentItemList[i].quantity+=itemQty;
        currentItemList[i].totalPrice+=parseFloat(itemPrice * itemQty);
        this.setState({
          cartItems: currentItemList
        });
        itemExist = 1;
      }
    }
    
    // If item does not exist, add it to the cart as a new item
    if (itemExist !== 1) {
      newItem.indexInInventory = itemIndexInInventory;
      newItem.code = itemCode;
      newItem.name = itemName;
      newItem.quantity = itemQty;
      newItem.totalPrice = parseFloat(itemPrice * itemQty);
      this.setState({
        cartItems: [...this.state.cartItems, newItem]
      });
    }
  }

  handleRemoveFromCart(item) {
    let currentInventoryItem = this.state.inventoryItems;
    let currentCartItems = this.state.cartItems;

    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].code === item.code) {
        currentInventoryItem[currentCartItems[i].indexInInventory].stock += currentCartItems[i].quantity;
        currentCartItems.splice(i, 1);
      }
    }
    
    this.setState({
      cartItems: currentCartItems
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
        <Cart cartItems={this.state.cartItems} onRemoveFromCart={this.handleRemoveFromCart.bind(this)} />
      </div>
    )
  }
}

export default App;