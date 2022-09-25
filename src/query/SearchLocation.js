import { React, useState } from "react";
import "./SearchLocation.css";

const SearchLocation = (props) => {
  const [location, setLocation] = useState("Chicago");

  function search(event) {
    props.onManualSearch(event, location);
  }

  function handleInput(event) {
    // setLocation(event.target.value);
    // console.log(event.target.value);
    setLocation(event.target.value);
    props.onSearchInput(event.target.value);
  }
  return (
    <div className="form-container">
      <form onSubmit={search}>
        <p>
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            id="city"
            value={location}
            onChange={handleInput}
          />
          <label htmlFor="search"></label>
          <button type="button" id="search" onClick={search}>
            Search
          </button>
        </p>
        <button type="button" onClick={props.locate}>
          Detect My Location
        </button>
      </form>
    </div>
  );
};

export default SearchLocation;
