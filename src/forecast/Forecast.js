import Card from "../weather/Card";
import { Day } from "./Day";
import "./Forecast.css";
const Forecast = (props) => {
  // console.log(props.day.forEach((day) => console.log(day)));
  return (
    <div className="forecast">
      <Day day={props.day} />
      {/* <Card
        day={i}
        weather={props.weather}
        maxTemp={props.maxTemp[index]}
        minTemp={props.minTemp[index]}
        sunrise={props.sunrise[index]}
        sunset={props.sunset[index]}
        precipitation={props.precipitation[index]}
        weatherCode={props.weatherCode[index]}
      /> */}
    </div>
  );
};

export default Forecast;

export const Forecast2 = () => {
  return "Hello";
};
