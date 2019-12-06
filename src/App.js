import React, { Component } from 'react';
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

  handleUpdateInventoryItem(itemIndex, itemStock, itemQty, removeFromCart) {
    const itemList = this.state.inventoryItems.slice(0);
    const currentInventoryStock = itemList[itemIndex].stock;
    const newStock = removeFromCart ? currentInventoryStock + itemQty : currentInventoryStock - itemQty;
    itemList[itemIndex].stock = newStock;

    this.setState({ inventoryItems: itemList });
  }

  handleUpdateCartItems(itemIndexInInventory, itemCode, itemName, itemPrice, itemQty) {
    const currentCartItems = this.state.cartItems.slice(0);
    let itemExist = false;
    let newItem;
    let currentCartTotal = this.state.totalPrice;

    // Check if item already exists
    for (let i = 0; i < currentCartItems.length && itemExist === false; i++) {
      // If item exists, update the quantity and price
      if (currentCartItems[i].code === itemCode) {
        currentCartItems[i].quantity += itemQty;
        currentCartItems[i].totalPrice += parseFloat(itemPrice * itemQty);
        currentCartTotal += parseFloat(itemPrice * itemQty);

        this.setState({
          cartItems: currentCartItems,
          totalPrice: currentCartTotal
        });

        itemExist = true;
      }
    }
    
    // If item does not exist, add it to the cart as a new item
    if (itemExist !== true) {
      newItem = {
        indexInInventory: itemIndexInInventory,
        code: itemCode,
        name: itemName,
        quantity: itemQty,
        totalPrice: parseFloat(itemPrice * itemQty)
      }
      currentCartTotal = this.state.totalPrice + newItem.totalPrice;

      this.setState((prevState, props) => ({
        cartItems:[...prevState.cartItems,newItem],
        totalPrice: currentCartTotal
      }));
    }
  }

  handleRemoveFromCart(item) {
    let currentInventoryItems = this.state.inventoryItems.slice(0);
    let currentCartItems = this.state.cartItems.slice(0);
    let currentCartTotal = this.state.totalPrice;
    let inventoryItemIndex;
    let itemFound = false;

    for (let i = 0; i < currentCartItems.length && itemFound === false; i++) {
      if (currentCartItems[i].code === item.code) {
        // Restore stock level in inventory
        inventoryItemIndex = currentCartItems[i].indexInInventory;
        this.handleUpdateInventoryItem(
          inventoryItemIndex, 
          currentInventoryItems[inventoryItemIndex].stock, 
          currentCartItems[i].quantity, 
          true
        );
        currentCartTotal -= currentCartItems[i].totalPrice; // Decreases the total price in cart
        currentCartItems.splice(i, 1); // Remove the item from cart
        
        this.setState({
          cartItems: currentCartItems,
          totalPrice: currentCartTotal
        });
        itemFound = true;
      }
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Home
            onUpdateInventoryItem={this.handleUpdateInventoryItem.bind(this)}
            onUpdateCartItems={this.handleUpdateCartItems.bind(this)}
            onRemoveFromCart={this.handleRemoveFromCart.bind(this)}
            inventoryItems={this.state.inventoryItems}
            cartItems={this.state.cartItems}
            totalPrice={this.state.totalPrice}
          />
        )} />
        <Route exact path='/checkout' render={() => (
          <Checkout
            cartItems={this.state.cartItems}
            totalPrice={this.state.totalPrice}
          />
        )} />
      </Switch>
    );
  }
}

export default App;