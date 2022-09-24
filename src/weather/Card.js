import { useState, useEffect } from "react";
import { getWeatherData } from "../services/GetWeatherData";

const Card = (props) => {
  const [error, setError] = useState(null);
  const [currentTemp, setCurrentTemp] = useState();
  // const [latitude, setLatitude] = useState(props.latitude)
  // const [longitude, setLongitude] = useState(props.longitude)
  // const [recievedLocation, setRecievedLocation] = useState(false);

  useEffect(() => {
    // console.log("in card.js", Number(props.latitude), Number(props.longitude));
    getWeatherData(Number(props.latitude), Number(props.longitude)).then(
      (response) => {
        console.log(response);
        setCurrentTemp(response.current_weather.temperature);
      },
      // prevent rendering errors
      (error) => {
        setError(error);
        console.log(error);
      }
    );
  }, [props.latitude, props.longitude]);

  if (error) {
    return <div>Error: {error}</div>;
  } else {
    return <div>Current Temp:{currentTemp}</div>;
  }
};

export default Card;
