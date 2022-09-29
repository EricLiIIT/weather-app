import Search from "./search/Search";
import { useEffect, useState } from "react";
import { getCityCoordinates } from "./services/GetCity";
import { getWeatherData } from "./services/GetWeatherData";
import { getCityName } from "./services/GetCity";
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
  const [selectedDay, setSelectedDay] = useState();
  const [maxTemp, setMaxTemp] = useState([0]);
  const [minTemp, setMinTemp] = useState([0]);
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
        // setLocation(location);
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
  }, [latitude, longitude]);

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
        console.log(`Error in App.js, ${error}`);
        alert("Invalid City");
      });
  }

  function locate() {
    navigator.geolocation.getCurrentPosition(success, locateError);
  }

  function success(position) {
    let pos = position.coords;
    getCityName(pos.latitude, pos.longitude)
      .then((response) => {
        setLocation(response.addresses[0].city);
        setLatitude(pos.latitude);
        setLongitude(pos.longitude);
      })
      .catch((error) => {
        console.log(`Error in App.js: ${error}`);
      });
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
    <div className="app">
      <Search onManualSearch={manualSearch} onLocate={locate} />
      <main className="weather">
        <Card
          weather={current}
          city={location}
          weatherCode={currentCondition}
          currentTemp={currentTemp}
          maxTemp={maxTemp}
          minTemp={minTemp}
          precipitation={precipitation}
          sunrise={sunrise}
          sunset={sunset}
          currentWindSpeed={currentWindSpeed}
          error={error}
        />
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
          Drop icon by Vectors Market.
        </a>
        <a
          href="https://www.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_8562848.htm"
          title="background"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clouds background by starline.
        </a>
      </footer>
    </div>
  );
}

export default App;
