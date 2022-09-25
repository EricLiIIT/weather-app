import SearchLocation from "./query/SearchLocation";
import { useState } from "react";
import { getCityCoordinates } from "./services/GetCity";
import Card from "./weather/Card.js";
import "./App.css";

function App() {
  const [location, setLocation] = useState("Chicago");
  const [latitude, setLatitude] = useState("41.875");
  const [longitude, setLongitude] = useState("-87.625");

  function manualSearch(event, location) {
    event.preventDefault();
    getCityCoordinates(location)
      .then((response) => {
        setLatitude(response.data[0].latitude);
        setLongitude(response.data[0].longitude);
        setLocation(location);
      })
      .catch((error) => console.log("error in App.js", error));
  }

  function locate() {
    navigator.geolocation.getCurrentPosition(success, locateError);
  }

  function success(position) {
    let pos = position.coords;
    setLatitude(pos.latitude);
    setLongitude(pos.longitude);
    setLocation(`${pos.latitude}, ${pos.longitude}`);
    console.log("successfully got location");
  }

  function locateError(error) {
    alert(`Unable to retrieve your location: ${error}`);
  }

  if (!navigator.geolocation) {
    alert("Unable to retrieve location");
  }

  return (
    <div>
      <SearchLocation onManualSearch={manualSearch} onLocate={locate} />
      <Card latitude={latitude} longitude={longitude} city={location} />
    </div>
  );
}

export default App;
