import React, {Component} from 'react';

import InventoryItem from './InventoryItem.js';

class Inventory extends Component {
  render() {
    const inventoryItems = this.props.items.map((item) => {
      return (
        <InventoryItem
          key={item.code} 
          itemIndex={item.itemIndex} 
          item={item} 
          onAddToCart={this.props.onAddToCart}
        />
      )  
    });

    return (
      <div className="inventory">
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
    );
  }
}

export default Inventory;