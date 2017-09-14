import React, {Component} from 'react';

import Search from './Search.js';
import Inventory from './Inventory.js';

class FilterableInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItems: props.data,
      searchText: '',
      filteredItems: []
    };
  }

  handleSearchTextChange(text) {
    // Returns items that have names matching the search text
    const filteredList = this.props.inventoryItems.filter((item) => {
      return item.name.toLowerCase().indexOf(text.toLowerCase().trim()) !== -1;
    });

    this.setState({
      searchText: text,
      filteredItems: filteredList
    });

  }
  
  handleAddToCart(itemStock, itemIndex, itemQty) {
    if (!isNaN(itemQty)) {
      const newItemList = this.props.inventoryItems.slice(0);

      this.props.onUpdateInventoryItem(itemIndex, itemStock, itemQty, false);

      this.props.onUpdateCartItems(
        itemIndex, 
        newItemList[itemIndex].code, 
        newItemList[itemIndex].name, 
        newItemList[itemIndex].price, 
        itemQty
      );
    }
  }

  render() {
    return (
      <div className="filterable-inventory">
        <Search
          searchText={this.state.searchText} 
          onSearchTextChange={this.handleSearchTextChange.bind(this)} 
        />
        <Inventory 
          items={
            this.state.searchText.length > 0 
            ? this.state.filteredItems 
            : this.props.inventoryItems
          } 
          onAddToCart={this.handleAddToCart.bind(this)} 
        />
      </div>
    )
  }
}

export default FilterableInventory;