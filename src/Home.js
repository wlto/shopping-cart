import React, {Component} from 'react';

import FilterableInventory from './FilterableInventory.js';
import Cart from './Cart.js';


class Home extends Component {
    state = {

        inventoryItems: this.props.inventoryItems,
        cartItems: this.props.cartItems,
        totalPrice: this.props.totalPrice

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
      <div className="shopping-cart">
        <h1 className="shopping-cart__title">React Shopping Cart</h1>
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
    );
  }
}

export default Home;