import React, {Component} from 'react';

class Search extends Component {
  render() {
    return (
      <div className="search-box">
        <input 
          type="text"
          value={this.props.searchText}
          placeholder="Search"
          autoFocus={true}
          onChange={(e) => this.props.onSearchTextChange(e.target.value)}
        />
      </div>
    )
  }
}

export default Search;