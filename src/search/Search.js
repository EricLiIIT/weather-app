import { React, useState } from "react";
import "./Search.css";

const Search = (props) => {
  const [location, setLocation] = useState("Chicago");

  function search(event) {
    props.onManualSearch(event, location);
  }

  function handleInput(event) {
    setLocation(event.target.value);
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
          <button type="button" onClick={props.onLocate}>
            Detect My Location
          </button>
        </p>
      </form>
    </div>
  );
};

export default Search;
