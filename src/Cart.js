import React from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  render() {
    const cartItems = this.props.cartItems.map((item, i) =>
      <CartItem key={item.code} item={item} onRemoveFromCart={this.props.onRemoveFromCart} />
    );

    const totalPrice = this.props.totalPrice.toFixed(2);
    const checkout = this.props.cartItems.map((item, i) =>
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
        <div className="cart-footer">
          <h2 className="cart-total-price">
            {/* Dollar sign below is just for the unit, not string interpolation. */}
            Total: <span>${totalPrice === (-0.00) ? 0.00 : totalPrice}</span>
          </h2>
          <Link to="/checkout" className="cart-receipt-btn">
            View Receipt
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;