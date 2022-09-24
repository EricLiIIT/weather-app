import { React, useState, useEffect } from "react";
import { GEO_API_URL, geoDbCitiesApiOptions } from "../services/GetCity";
import Card from "../weather/Card.js";

export default function SearchLocation() {
  const [location, setLocation] = useState("");
  const [didSearch, setDidSearch] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function handleLocationInput(event) {
    setLocation(event.target.value);
  }

  function handleManualSearch(event) {
    event.preventDefault();
    setDidSearch(true);
  }

  function loadLocation(location) {
    console.log("searchLocation.js:", location);
    return fetch(
      `${GEO_API_URL}/cities?&namePrefix=${location}`,
      geoDbCitiesApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(
          response.data[0].name,
          response.data[0].latitude,
          response.data[0].longitude
        );
        setLatitude(response.data[0].latitude);
        setLongitude(response.data[0].longitude);
      })
      .catch((err) => console.error(err));
  }

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log("successfully got location");
  }

  function locateError(error) {
    alert("Unable to retrieve your location");
  }

  function findLocation() {
    navigator.geolocation.getCurrentPosition(success, locateError);
  }

  if (!navigator.geolocation) {
    alert("Unable to retrieve location");
  } else {
    // some loading animation...
    findLocation();
  }

  useEffect(() => {
    if (didSearch) {
      loadLocation(location);
      setDidSearch(false);
    }
  }, [location, didSearch]);

  return (
    <div>
      <form onSubmit={handleManualSearch}>
        <fieldset>
          <legend>Enter city or automatically detect location:</legend>
          <p>
            <label htmlFor="city">Location:</label>
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
        </fieldset>
        <button type="button" onClick={findLocation}>
          Find My Location
        </button>
      </form>
      <Card latitude={latitude} longitude={longitude} />
    </div>
  );
}
