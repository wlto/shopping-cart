import React, {Component} from 'react';

class Item extends Component {
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
        <td>{item.price.toFixed(2)}</td>
        <td>
          <input
            type="number"
            min="1"
            max={item.stock}
            defaultValue={this.state.itemQty}
            onChange={(e) => this.setState({ itemQty: parseInt(e.target.value, 10) })}
          />
        </td>
        <td>
          <button 
            disabled={item.stock < this.state.itemQty || this.state.itemQty < 0}
            onClick={
              () => this.props.onAddToCart(this.props.item, this.props.itemIndex, this.state.itemQty)
            }>
            Add to Cart
          </button>
        </td>
      </tr>
    )
  }
}

export default Item;