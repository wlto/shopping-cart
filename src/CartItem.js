import React from 'react';

const CartItem = (props) => {
  const item = props.item;
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td><span>$</span>{item.totalPrice.toFixed(2)}</td>
      <td className="cart-item-remove-btn">
        <button onClick={() => props.onRemoveFromCart(item)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartItem