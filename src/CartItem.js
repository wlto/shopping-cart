import React, {Component} from 'react';

class CartItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.totalPrice.toFixed(2)}</td>
      </tr>
    )
  }
}

export default CartItem