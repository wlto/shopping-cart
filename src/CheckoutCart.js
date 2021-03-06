import React from 'react';

class CheckoutCart extends React.Component {
  render() {
    const cartItems = this.props.cartItems.map((item, i) =>
      <tr key={i}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td><span>$</span>{item.totalPrice.toFixed(2)}</td> 
      </tr>
    );
    const totalPrice = this.props.totalPrice.toFixed(2);

    return (
      <div className="cart">
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
        <div className="cart-footer">
          <h2 className="cart-total-price">
            {/* Dollar sign below is just for the unit, not string interpolation. */}
            Total: <span>${totalPrice === (-0.00) ? 0.00 : totalPrice}</span>
          </h2>
        </div>
      </div>
    );
  }
}

export default CheckoutCart;