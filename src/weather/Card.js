import { useState, useEffect } from "react";
import { getWeatherData } from "../services/GetWeatherData";
import "./Card.css";

const Card = (props) => {
  const [error, setError] = useState(null);
  const [currentTemp, setCurrentTemp] = useState();
  const [city, setCity] = useState("Chicago");
  const [windSpeed, setWindSpeed] = useState();

  useEffect(() => {
    getWeatherData(Number(props.latitude), Number(props.longitude)).then(
      (response) => {
        console.log("Card.js response", response);
        setCurrentTemp(response.current_weather.temperature);
        setCity(props.city);
        setWindSpeed(response.current_weather.windspeed);
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
      <div>
        <p>City: {city}</p>
        <p>Current Temp: {currentTemp}</p>
        <p>Wind Speed: {windSpeed} mph</p>
      </div>
    );
  }
};

export default Card;
