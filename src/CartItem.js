import React, {Component} from 'react';

class CartItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td><span>$</span>{item.totalPrice.toFixed(2)}</td>
      </tr>
    )
  }
}

export default CartItem