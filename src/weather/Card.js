import "./Card.css";
import { weatherConditionCode } from "../services/WeatherCodes";

const Card = (props) => {
  if (
    props.error ||
    (!weatherConditionCode[props.weatherCode] && props.weather === "current")
  ) {
    console.log("error");
    return <div>Error: {props.error}</div>;
  } else {
    // console.log(props.weather);
    return (
      <div className="weather-card">
        <span>
          <div>
            {props.weather === "current" ? (
              <div className="city">
                <h1>{props.city}</h1>
              </div>
            ) : (
              <div className="date">{props.day}</div>
            )}

            <div className="weather-data">
              {props.weather === "current" ? (
                <div className="current-temp">
                  <p>Temp: {props.currentTemp}</p>
                  <p className="wind-speed">
                    Wind Speed: {props.currentWindSpeed} mph
                  </p>
                </div>
              ) : (
                <div>
                  <p>High: {props.maxTemp}</p>
                  <p>Low: {props.minTemp}</p>
                  <p>Sunrise: {props.sunrise}</p>
                  <p>Sunset: {props.sunset}</p>
                  <p>Precipitation: {props.precipitation} in</p>
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
