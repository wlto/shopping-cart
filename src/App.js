import React, {Component} from 'react';

import FilterableInventory from './FilterableInventory.js';
import Cart from './Cart.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItems: props.data,
      cartItems: [],
      totalPrice: 0
    };
  }

  handleUpdateInventoryItem(itemIndex, itemStock, itemQty, removeFromCart) {
    const itemList = this.state.inventoryItems.slice(0);
    const currentItemStock = itemList[itemIndex].stock;
    const newStock = removeFromCart ? currentItemStock + itemQty : currentItemStock - itemQty;
    itemList[itemIndex].stock = newStock;

    this.setState({ inventoryItems: itemList });
  }

  handleUpdateCartItems(itemIndexInInventory, itemCode, itemName, itemPrice, itemQty) {
    const currentItemList = this.state.cartItems.slice(0);
    let itemExist = 0;
    let newItem;
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
      newItem = {
        indexInInventory: itemIndexInInventory,
        code: itemCode,
        name: itemName,
        quantity: itemQty,
        totalPrice: parseFloat(itemPrice * itemQty)
      }
      currentTotal = this.state.totalPrice + newItem.totalPrice;

      this.setState({
        cartItems: [...this.state.cartItems, newItem],
        totalPrice: currentTotal
      });

    }
  }

  handleRemoveFromCart(item) {
    let currentInventoryItem = this.state.inventoryItems.slice(0);
    let currentCartItems = this.state.cartItems.slice(0);
    let currentTotal = this.state.totalPrice;
    let inventoryItemIndex;

    for (let i = 0; i < currentCartItems.length; i++) {
      if (currentCartItems[i].code === item.code) {
        // Restore stock level in inventory
        inventoryItemIndex = currentCartItems[i].indexInInventory;
        this.handleUpdateInventoryItem(
          inventoryItemIndex, 
          currentInventoryItem[inventoryItemIndex].stock, 
          currentCartItems[i].quantity, 
          true
        );
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
        <FilterableInventory 
          inventoryItems={this.state.inventoryItems} 
          onUpdateCartItems={this.handleUpdateCartItems.bind(this)} 
          onUpdateInventoryItem={this.handleUpdateInventoryItem.bind(this)}
        />
        <Cart 
          cartItems={this.state.cartItems} 
          onRemoveFromCart={this.handleRemoveFromCart.bind(this)}
          totalPrice={this.state.totalPrice} 
        />
      </div>
    )
  }
}

export default App;