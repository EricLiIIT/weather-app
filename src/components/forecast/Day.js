import "./Day.css";
import { weatherConditionCode } from "../services/WeatherCodes";
import React, { useState } from "react";

export const Day = (props) => {
  const [meterColor, setMeterColor] = useState("");
  const colors = {
    cold: 51,
    warm: 80,
    hot: 81,
  };

  function convertToDay(date, index) {
    const day = new Date(date).getDay();
    if (index === 0) return "Today";
    const daysOfTheWeek = {
      0: "Mon",
      1: "Tues",
      2: "Wed",
      3: "Thur",
      4: "Fri",
      5: "Sat",
      6: "Sun",
    };
    return daysOfTheWeek[day];
  }

  // retrieve index of forecasted day
  function onClick(event) {
    let index = event.currentTarget.getAttribute("data-index");
    props.handleClick(index);
  }

  let lowestWeeklyTemp = props.minTemp.reduce((prev, curr) =>
    Math.min(prev, curr)
  );

  let highestWeeklyTemp = props.maxTemp.reduce((prev, curr) =>
    Math.max(prev, curr)
  );

  return props.day.map((i, index) => (
    <div
      className="day-of-the-week"
      key={i}
      data-index={index}
      onClick={onClick}
    >
      <div className="day">{convertToDay(props.day[index], index)}</div>
      <div className="temperature-data">
        <p className="min-temp">{props.minTemp[index]}&deg;</p>
        <meter
          className="temperature-range cold"
          value={(props.maxTemp[index] + props.minTemp[index]) / 2}
          min={lowestWeeklyTemp}
          max={highestWeeklyTemp}
        ></meter>
        <p className="max-temp">{props.maxTemp[index]}&deg;</p>
        <img
          src={require(`../weather-icons/${
            weatherConditionCode[props.weatherCode[index]][1]
          }.png`)}
          alt={weatherConditionCode[props.weatherCode[index]][1]}
          className="forecast-icon"
        />
      </div>
    </div>
  ));
};
