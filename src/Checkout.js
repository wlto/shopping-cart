import React, {Component} from 'react';
import CheckoutCart from './CheckoutCart';


class Checkout extends Component {
    state = {
        cartItems: this.props.cartItems,
        totalPrice: this.props.totalPrice

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
        <h1 className="shopping-cart__title">Invoice</h1>
        <CheckoutCart 
        cartItems = {this.state.cartItems}
        totalPrice = {this.state.totalPrice}
        />

        
      </div>
    );
  }
}

export default Checkout;