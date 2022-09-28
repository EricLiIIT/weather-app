import "./Card.css";
import { weatherConditionCode } from "../services/WeatherCodes";

const Card = (props) => {
  if (
    props.error ||
    (!weatherConditionCode[props.weatherCode] && props.weather === "current")
  ) {
    console.log("error");
    return <div>Error: {props.error}</div>;
  } else if (props.weather === "current") {
    console.log("current weather");
    console.log(props.weather);
    // render current
    return (
      <div className="weather-card">
        <span>
          <div>
            <div className="city">
              <h1>{props.city}</h1>
            </div>
            <div className="weather-data">
              <p className="current-temp">Temp: {props.currentTemp}</p>
              <p className="wind-speed">Wind Speed: {props.windSpeed} mph</p>
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
  // else if (props.weather === "forecast") {
  //   console.log("render forecast");
  //   console.log(props.weather);
  //   // render forecast
  //   return (
  //     <div className="weather-card">
  //       <span>
  //         <div>
  //           <div className="city">
  //             <h1>{props.city}</h1>
  //           </div>
  //           <div className="weather-data">
  //             <p className="current-temp">Temp: {props.currentTemp}</p>
  //             <p className="wind-speed">Wind Speed: {props.windSpeed} mph</p>
  //           </div>
  //         </div>
  //         <div className="weather-condition">
  //           <img
  //             src={require(`../weather-icons/${
  //               weatherConditionCode[props.weatherCode][1]
  //             }.png`)}
  //             alt={weatherConditionCode[props.weatherCode][1]}
  //           />
  //           <div>{weatherConditionCode[props.weatherCode][0]}</div>
  //         </div>
  //       </span>
  //       <p>Temps:</p>
  //       <p>{props.maxTemp}</p>
  //     </div>
  //   );
  // }
};

export default Card;
