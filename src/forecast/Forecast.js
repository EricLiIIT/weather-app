import Card from "../weather/Card";
import { useState } from "react";
const Forecast = (props) => {
  return (
    <div>
      <h1>Forecast component</h1>
      <Card
        weather={props.weather}
        latitude={props.latitude}
        longitude={props.longitude}
        city={props.city}
        weatherCode={props.weatherCode}
        maxTemp={props.maxTemp}
      />
    </div>
  );
};

export default Forecast;
