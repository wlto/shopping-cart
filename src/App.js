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
      cartItems: [],
      totalPrice: 0
    };
  }
  
  handleSearchTextChange(text) {
    // Returns items that have names matching the search text
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
    this.handleUpdateCartItems(
      itemIndex, 
      newItemList[itemIndex].code, 
      newItemList[itemIndex].name, 
      newItemList[itemIndex].price, 
      itemQty
    );
  }

  handleUpdateCartItems(itemIndexInInventory, itemCode, itemName, itemPrice, itemQty) {
    const currentItemList = this.state.cartItems;
    let itemExist = 0;
    let newItem = {};
    let currentTotal = this.state.totalPrice;

    // Check if item already exists
    for (let i = 0; i < currentItemList.length && itemExist === 0; i++) {
      // If item exists, update the quantity and price
      if (currentItemList[i].code === itemCode) {
        currentItemList[i].quantity += itemQty;
        currentItemList[i].totalPrice += parseFloat(itemPrice * itemQty);
        currentTotal += parseFloat(itemPrice * itemQty);
        this.setState({
          cartItems: currentItemList,
          totalPrice: currentTotal
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
      currentTotal = this.state.totalPrice + newItem.totalPrice;
      this.setState({
        cartItems: [...this.state.cartItems, newItem],
        totalPrice: currentTotal
      });
    }
  }

  handleRemoveFromCart(item) {
    let currentInventoryItem = this.state.inventoryItems;
    let currentCartItems = this.state.cartItems;
    let currentTotal = this.state.totalPrice;

    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].code === item.code) {
        // Restore stock level in inventory
        currentInventoryItem[currentCartItems[i].indexInInventory].stock += currentCartItems[i].quantity;
        currentTotal -= currentCartItems[i].totalPrice;
        currentCartItems.splice(i, 1);
      }
    }
    
    this.setState({
      cartItems: currentCartItems,
      totalPrice: currentTotal
    });
  }
  
  render() {
    return (
      <div className="shopping-cart">
        <Search
          searchText={this.state.searchText} 
          onSearchTextChange={this.handleSearchTextChange.bind(this)} />
        <Inventory 
          data={
            this.state.searchText.length > 0 
            ? this.state.filteredItems 
            : this.state.inventoryItems
          } 
          onAddToCart={this.handleAddToCart.bind(this)} />
        <Cart 
          cartItems={this.state.cartItems} 
          onRemoveFromCart={this.handleRemoveFromCart.bind(this)}
          totalPrice={this.state.totalPrice} />
      </div>
    )
  }
}

export default App;