import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import CheckoutCart from './CheckoutCart';

class Checkout extends Component {
  render() {
    return (
      <div className="shopping-cart">
        <Link to="/" className="shopping-cart-goback">
          Go Back
        </Link>
        <h1 className="shopping-cart__title">Invoice</h1>
        <CheckoutCart
          cartItems = {this.props.cartItems}
          totalPrice = {this.props.totalPrice}
        />
      </div>
    );
  }
}

export default Checkout;