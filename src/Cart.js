import React, {Component} from 'react';

import CartItem from './CartItem';

class Cart extends Component {
  render() {
    const cartItems = this.props.cartItems.map((item, i) =>
      <CartItem key={item.code} item={item} onRemoveFromCart={this.props.onRemoveFromCart} />
    );
    return (
      <div className="cart">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {cartItems}
          </tbody>
        </table>
        <h2 className="cart-total-price">Total: <span>${this.props.totalPrice.toFixed(2)}</span></h2>
      </div>
    )
  }
}

export default Cart;