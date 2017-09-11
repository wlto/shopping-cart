import React, {Component} from 'react';

class InventoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQty: 1
    }
  }
  
  render() {
    const item = this.props.item;
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.code}</td>
        <td>{item.stock}</td>
        <td><span>$</span>{item.price.toFixed(2)}</td>
        <td>
          <input
            type="number"
            min="1"
            max={item.stock}
            value={this.state.itemQty}
            onChange={(e) => this.setState({ itemQty: parseInt(e.target.value, 10) })}
          />
        </td>
        <td>
          <button 
            disabled={item.stock < this.state.itemQty || item.stock === 0 || this.state.itemQty <= 0}
            onClick={
              () => {
                this.setState({ itemQty: 1 });
                this.props.onAddToCart(item, this.props.itemIndex, this.state.itemQty);
              }
            }
          >
            Add to Cart
          </button>
        </td>
      </tr>
    )
  }
}

export default InventoryItem;