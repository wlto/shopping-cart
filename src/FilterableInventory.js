import React, {Component} from 'react';
import Search from './Search.js';
import Inventory from './Inventory.js';

class FilterableInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      filteredItems: this.props.inventoryItems
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
      // copies inventory's items to a temporary array
      const newItemList = this.props.inventoryItems.slice(0);

      // updates inventory
      this.props.onUpdateInventoryItem(itemIndex, itemStock, itemQty, false);

      // updates cart
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
          items={this.state.filteredItems} 
          onAddToCart={this.handleAddToCart.bind(this)} 
        />
      </div>
    );
  }
}

export default FilterableInventory;