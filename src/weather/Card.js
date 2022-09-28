import "./Card.css";
import { weatherConditionCode } from "../services/WeatherCodes";

const Card = (props) => {
  function convertToDay(date) {
    const day = new Date(date).getDay();
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

  function convertDate(date) {
    const date1 = new Date(date);
    if (date1.getHours() > 12) {
      return `${date1.getHours() - 12}:${date1.getMinutes()}`;
    } else {
      return `${date1.getHours()}:${date1.getMinutes()}`;
    }
  }

  if (
    props.error ||
    (!weatherConditionCode[props.weatherCode] && props.weather === "current")
  ) {
    console.log("error");
    return <div>Error: {props.error}</div>;
  } else {
    return (
      <div
        className="weather-card"
        id={props.weather === "current" ? "current" : "forecast"}
      >
        <span>
          <div>
            {props.weather === "current" ? (
              <div className="city">
                <h1>{props.city}</h1>
              </div>
            ) : (
              <div className="date">
                <h1>{convertToDay(props.day)}</h1>
              </div>
            )}

            <div className="weather-data">
              {props.weather === "current" ? (
                <div className="current-temp">
                  <p>Temp: {props.currentTemp}</p>
                  <p>High: {props.maxTemp[0]}</p>
                  <p>Low: {props.minTemp[0]}</p>
                  <p>Precipitation: {props.precipitation[0]} in</p>
                  <p className="wind-speed">
                    Wind Speed: {props.currentWindSpeed} mph
                  </p>
                </div>
              ) : (
                <div>
                  <p>High: {props.maxTemp}</p>
                  <p>Low: {props.minTemp}</p>
                  <p>Precip: {props.precipitation} in</p>
                  <p>Sunrise: {convertDate(props.sunrise)} AM</p>
                  <p>Sunset: {convertDate(props.sunset)} PM</p>
                </div>
              )}
            </div>
          </div>
          <div className="weather-condition">
            <img
              src={require(`../weather-icons/${
                weatherConditionCode[props.weatherCode][1]
              }.png`)}
              alt={weatherConditionCode[props.weatherCode][1]}
            />
            <div>{weatherConditionCode[props.weatherCode][0]}</div>
          </div>
        </span>
      </div>
    );
  }
};

export default Card;
