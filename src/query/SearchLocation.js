import { React, useState, useEffect } from "react";
import { getCityCoordinates } from "../services/GetCity";
import "./SearchLocation.css";
import Card from "../weather/Card.js";

const SearchLocation = () => {
  const [location, setLocation] = useState("Chicago");
  const [didSearch, setDidSearch] = useState(false);
  const [latitude, setLatitude] = useState("41.875");
  const [longitude, setLongitude] = useState("-87.625");

  function handleLocationInput(event) {
    setDidSearch(false);
    setLocation(event.target.value);
  }

  function handleManualSearch(event) {
    setDidSearch(true);
    event.preventDefault();
    // get coordinates of entered city:
    getCityCoordinates(location)
      .then((response) => {
        setLatitude(response.data[0].latitude);
        setLongitude(response.data[0].longitude);
      })
      .catch((error) => console.log(error));
  }

  function findLocation() {
    navigator.geolocation.getCurrentPosition(success, locateError);
  }

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log("successfully got location");
  }

  function locateError(error) {
    alert(`Unable to retrieve your location: ${error}`);
  }

  if (!navigator.geolocation) {
    alert("Unable to retrieve location");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleManualSearch}>
        <p>
          <label htmlFor="city">City: </label>
          <input
            type="text"
            name="city"
            id="city"
            value={location}
            onChange={handleLocationInput}
          />
          <label htmlFor="search"></label>
          <button type="button" id="search" onClick={handleManualSearch}>
            Search
          </button>
        </p>
        <button type="button" onClick={findLocation}>
          Detect My Location
        </button>
      </form>
      <Card
        latitude={latitude}
        longitude={longitude}
        city={didSearch ? location : null}
        didSearch={didSearch}
      />
    </div>
  );
};

export default SearchLocation;
