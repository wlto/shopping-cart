import React from 'react';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = props.cartItems.map((item, i) =>
    <CartItem key={item.code} item={item} onRemoveFromCart={props.onRemoveFromCart} />
  );
  const totalPrice = props.totalPrice.toFixed(2);

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
      <h2 className="cart-total-price">
        {/* Dollar sign below is just for the unit, not string interpolation. */}
        Total: <span>${totalPrice === (-0.00) ? 0.00 : totalPrice}</span>
      </h2>
    </div>
  );
}

export default Cart;