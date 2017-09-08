import React, {Component} from 'react';

class Search extends Component {
  render() {
    return (
      <div className="search-box">
        <h2>Search</h2>
        <input 
          type="text"
          value={this.props.searchText}
          onChange={(e) => this.props.onSearchTextChange(e.target.value)}
        />
      </div>
    )
  }
}

export default Search;