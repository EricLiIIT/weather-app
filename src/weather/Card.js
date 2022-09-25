import { useState, useEffect } from "react";
import { getWeatherData } from "../services/GetWeatherData";
import "./Card.css";

const Card = (props) => {
  const [error, setError] = useState(null);
  const [currentTemp, setCurrentTemp] = useState();
  const [city, setCity] = useState("Chicago");
  const [windSpeed, setWindSpeed] = useState();
  const [condition, setCondition] = useState();

  const weatherConditionCode = {
    0: ["Clear sky", "clear"],
    1: ["Mainly clear", "clear"],
    2: ["Partly cloudy", "cloud"],
    3: ["Overcast", "cloud"],
    45: ["Fog", "cloud2"],
    48: ["Depositing rime fog", "cloud-2"],
    51: ["Light drizzle", "rain"],
    53: ["Moderate drizzle", "rain"],
    55: ["Intense drizzle", "rain"],
    61: ["Slight rain", "rain"],
    63: ["Moderate rain", "rain"],
    65: ["Heavy rain", "heavy-rain"],
    66: ["Light freezing rain", "rain"],
    67: ["Heavy freezing rain", "heavy-rain"],
    71: ["Slight snowfall", "snow"],
    73: ["Moderate snowfall", "snow"],
    75: ["Intense snowfall", "snow"],
    77: ["Snow grains", "snow"],
    80: ["Slight rain shower", "heavy-rain"],
    81: ["Moderate rain shower", "heavy-rain"],
    82: ["Violent rain shower", "heavy-rain"],
    85: ["Slight snow shower", "snow"],
    86: ["Heavy snow shower", "snow"],
    95: ["Thunderstorm", "thunderstorm"],
    96: ["Thunderstorm with slight hail", "thunderstorm"],
    99: ["Thunderstorm with heavy hail", "thunderstorm"],
  };

  useEffect(() => {
    getWeatherData(Number(props.latitude), Number(props.longitude)).then(
      (response) => {
        console.log(response);
        let current = response.current_weather;
        setCity(props.city);
        setCurrentTemp(current.temperature);
        setWindSpeed(current.windspeed);
        setCondition(current.weathercode);
      },
      // prevent rendering errors
      (error) => {
        setError(error);
        console.log(error);
      }
    );
  }, [props.didSearch, props.latitude, props.longitude, props.city]);

  if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <div className="weather-card">
        <span>
          <div className="city">{city}</div>
          <div className="weather-condition">
            <img
              src={require(`../weather-icons/${weatherConditionCode[condition][1]}.png`)}
              alt={weatherConditionCode[condition][1]}
            />
            <div>{weatherConditionCode[condition][0]}</div>
          </div>
        </span>
        <p className="current-temp">Current Temp: {currentTemp}</p>
        <p className="wind-speed">Wind Speed: {windSpeed} mph</p>
      </div>
    );
  }
};

export default Card;
