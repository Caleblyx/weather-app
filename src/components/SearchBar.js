import React from "react";
import search from "../images/search.jpeg";
import PropTypes from "prop-types";

const SearchBar = ({setCityInput, cityInput, onSubmitCitySearch}) => {
  return (
    <form onSubmit={e => onSubmitCitySearch(e)}>
      <input 
        name="city"
        value = {cityInput}
        onChange={e => setCityInput(e.target.value)} 
        type="text"
        placeholder="Search for a city's weather here"
        action="#"
      />
      <button>
        <img id="search-button" src={search}/>
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  setCityInput : PropTypes.func.isRequired,
  cityInput : PropTypes.string.isRequired,
  onSubmitCitySearch: PropTypes.func.isRequired
};

export default SearchBar;