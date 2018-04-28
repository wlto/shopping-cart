import React from 'react';

const Search = (props) => (
  <div className="search-box">
    <input 
      type="text"
      value={props.searchText}
      placeholder="Search"
      autoFocus={true}
      onChange={(e) => props.onSearchTextChange(e.target.value)}
    />
  </div>
);

export default Search;