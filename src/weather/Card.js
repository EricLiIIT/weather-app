import { useState, useEffect } from "react";
import { getWeatherData } from "../services/GetWeatherData";

const Card = () => {
  const [currentTemp, setCurrentTemp] = useState();

  useEffect(() => {
    getWeatherData()
      .then((response) => {
        console.log(response);
        setCurrentTemp(response.current_weather.temperature);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>Current Temp:{currentTemp}</div>;
};

export default Card;
