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
  const current = "current";
  const [currentTemp, setCurrentTemp] = useState();
  const [currentWindSpeed, setCurrentWindSpeed] = useState();
  const [currentCondition, setCurrentCondition] = useState();

  // forecast weather data
  const forecast = "forecast";
  const [maxTemp, setMaxTemp] = useState([]);
  const [minTemp, setMinTemp] = useState([]);
  const [weatherCode, setWeatherCode] = useState([]);
  const [day, setDay] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [precipitation, setPrecipitation] = useState([]);

  useEffect(() => {
    getWeatherData(latitude, longitude).then(
      (response) => {
        console.log("weather res:", response);
        let current = response.current_weather;
        let forecast = response.daily;
        setLocation(location);
        setCurrentTemp(current.temperature);
        setCurrentWindSpeed(current.windspeed);
        setCurrentCondition(current.weathercode);
        // Forecast Conditions:
        setMaxTemp(forecast.temperature_2m_max);
        setMinTemp(forecast.temperature_2m_min);
        setWeatherCode(forecast.weathercode);
        setDay(forecast.time); // returns dates for next 7 days
        setSunrise(forecast.sunrise);
        setSunset(forecast.sunset);
        setPrecipitation(forecast.precipitation_sum);
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
        let city = response.addresses[0];
        setLatitude(city.latitude);
        setLongitude(city.longitude);
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
      <main className="weather">
        <Forecast
          weather={forecast}
          city={location}
          weatherCode={weatherCode}
          maxTemp={maxTemp}
          minTemp={minTemp}
          day={day}
          sunrise={sunrise}
          sunset={sunset}
          precipitation={precipitation}
          error={error}
        />

        <Card
          weather={current}
          city={location}
          weatherCode={currentCondition}
          currentTemp={currentTemp}
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitation}
          currentWindSpeed={currentWindSpeed}
          error={error}
        />
      </main>

      <footer>
        <a
          href="https://www.flaticon.com/packs/weather-535?word=weather"
          title="weather icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          Weather icons by kimnizuma.
        </a>
        <a
          href="https://www.flaticon.com/free-icon/drop_427112?term=rain%20drop&page=1&position=3&page=1&position=3&related_id=427112&origin=search"
          title="drop icon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Drop icon by Vectors Market
        </a>
      </footer>
    </div>
  );
}

export default App;
