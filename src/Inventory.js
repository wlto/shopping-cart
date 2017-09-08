import React, {Component} from 'react';

import Item from './Item.js';

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data
    }
  }

  render() {
    const inventoryItems = this.props.data.map((item, i) => {
      return (
        <Item 
          key={item.code} 
          itemIndex={i} 
          item={item} 
          onAddToCart={this.props.onAddToCart}
        />
      )  
    });

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Code</td>
              <td>Stock</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {inventoryItems}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Inventory;