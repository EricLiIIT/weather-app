import Search from "./search/Search";
import { useEffect, useState } from "react";
import { getCityCoordinates } from "./services/GetCity";
import { getWeatherData } from "./services/GetWeatherData";
import Card from "./weather/Card.js";
import Forecast from "./forecast/Forecast";
import "./App.css";

function App() {
  const [location, setLocation] = useState("Chicago");
  const [latitude, setLatitude] = useState("41.875");
  const [longitude, setLongitude] = useState("-87.625");
  const [error, setError] = useState(null);

  // weather data
  const [currentTemp, setCurrentTemp] = useState();
  const [currentWindSpeed, setCurrentWindSpeed] = useState();
  const [condition, setCondition] = useState();
  const [forecastMaxTemp, setForecastMaxTemp] = useState();

  useEffect(() => {
    getWeatherData(latitude, longitude).then(
      (response) => {
        console.log("weather res:", response);
        let current = response.current_weather;
        let forecast = response.daily;
        setLocation(location);
        setCurrentTemp(current.temperature);
        setCurrentWindSpeed(current.windspeed);
        setCondition(current.weathercode);
        setForecastMaxTemp(forecast.temperature_2m_max);
        console.log(forecast.temperature_2m_max);
      },
      (error) => {
        setError(error);
      }
    );
  }, [latitude, longitude, location]);

  function manualSearch(event, location) {
    event.preventDefault();
    getCityCoordinates(location)
      .then((response) => {
        setLatitude(response.data[0].latitude);
        setLongitude(response.data[0].longitude);
        setLocation(location);
      })
      .catch((error) => {
        console.log("error in App.js", error);
        alert("Invalid City");
      });
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
    if (!error) {
      alert("Unable to retrieve location");
    }
    alert(`Unable to retrieve your location: ${error}`);
  }

  if (!navigator.geolocation) {
    locateError();
  }

  return (
    <div>
      <Search onManualSearch={manualSearch} onLocate={locate} />
      <Card
        latitude={latitude}
        longitude={longitude}
        city={location}
        currentTemp={currentTemp}
        currentWindSpeed={currentWindSpeed}
        weatherCode={condition}
        error={error}
      />
      <Forecast
        latitude={latitude}
        longitude={longitude}
        city={location}
        weatherCode={condition}
        forecastMaxTemp={forecastMaxTemp}
      />
    </div>
  );
}

export default App;
