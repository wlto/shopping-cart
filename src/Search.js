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
    {/* <select className="search-filter">
      <option value="1" selected>Name</option>
      <option value="1">Type</option>
    </select> */}
  </div>
);

export default Search;