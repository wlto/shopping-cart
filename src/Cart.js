import React, {Component} from 'react';

import CartItem from './CartItem';

class Cart extends Component {
  render() {
    const cartItems = this.props.cartItems.map((item, i) => 
      <CartItem key={item.code} item={item} />
    );
    return (
      <div className="cart">
        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {cartItems}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Cart;