import { React, useState, useEffect } from "react";
import { getCityCoordinates } from "../services/GetCity";
import "./SearchLocation.css";
import Card from "../weather/Card.js";

export default function SearchLocation() {
  const [location, setLocation] = useState("Chicago");
  const [didSearch, setDidSearch] = useState(false);
  const [latitude, setLatitude] = useState("41.875");
  const [longitude, setLongitude] = useState("-87.625");

  function handleLocationInput(event) {
    setLocation(event.target.value);
  }

  function handleManualSearch(event) {
    event.preventDefault();
    setDidSearch(true);
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

  useEffect(() => {
    if (didSearch) {
      getCityCoordinates(location)
        .then((response) => {
          setLatitude(response.data[0].latitude);
          setLongitude(response.data[0].longitude);
        })
        .catch((error) => console.log(error));
      setDidSearch(false);
    }
  }, [location, didSearch]);

  return (
    <div class="form-container">
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
      <Card latitude={latitude} longitude={longitude} city={location} />
    </div>
  );
}
