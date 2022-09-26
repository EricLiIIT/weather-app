import { React, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
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
          <label htmlFor="search" />
          <BsSearch
            id="search"
            className="btn"
            onClick={search}
            tabIndex="0"
            title="Search"
          />
          <label htmlFor="locate" />
          <GrMapLocation
            id="locate"
            className="btn"
            onClick={props.onLocate}
            tabIndex="0"
            title="Detect location"
          />
        </p>
      </form>
    </div>
  );
};

export default Search;
